import math
import random
import sys
import pygame

WIDTH, HEIGHT = 1280, 720
FPS = 60

LANES = [-1, 0, 1]

class Player:
    def __init__(self):
        self.lane = 0
        self.x = WIDTH // 2
        self.target_x = self.x
        self.y = HEIGHT - 130
        self.speed = 220
        self.max_speed = 420
        self.accel = 170
        self.brake = 250
        self.nitro = 100
        self.alive = True

    def update(self, dt, keys):
        if keys[pygame.K_a] or keys[pygame.K_LEFT]:
            self.target_x -= 440 * dt
        if keys[pygame.K_d] or keys[pygame.K_RIGHT]:
            self.target_x += 440 * dt

        self.target_x = max(WIDTH * 0.28, min(WIDTH * 0.72, self.target_x))
        self.x += (self.target_x - self.x) * min(1, dt * 10)

        if keys[pygame.K_w] or keys[pygame.K_UP]:
            self.speed += self.accel * dt
        if keys[pygame.K_s] or keys[pygame.K_DOWN]:
            self.speed -= self.brake * dt

        self.speed -= 22 * dt
        self.speed = max(120, min(self.max_speed, self.speed))

        if keys[pygame.K_SPACE] and self.nitro > 0:
            self.speed = min(self.max_speed + 110, self.speed + 210 * dt)
            self.nitro = max(0, self.nitro - 35 * dt)
        else:
            self.nitro = min(100, self.nitro + 14 * dt)

class TrafficCar:
    def __init__(self):
        self.reset()

    def reset(self):
        self.lane = random.choice(LANES)
        self.z = random.uniform(0.25, 1.3)
        self.speed_factor = random.uniform(0.35, 0.95)
        self.color = pygame.Color(0)
        self.color.hsva = (random.randint(0, 360), 75, 95, 100)

    def update(self, dt, player_speed):
        self.z -= dt * ((player_speed * 0.0021) - (self.speed_factor * 0.17))
        if self.z < 0.20 or self.z > 1.4:
            self.reset()

class Game:
    def __init__(self):
        pygame.init()
        pygame.display.set_caption("Night Driver: Neon Rush")
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont("consolas", 24)
        self.big = pygame.font.SysFont("consolas", 54, bold=True)

        self.player = Player()
        self.traffic = [TrafficCar() for _ in range(13)]
        self.distance = 0
        self.score = 0
        self.best = 0
        self.curve = 0
        self.curve_target = 0
        self.curve_timer = 0
        self.running = True

    def project(self, lane_offset, z):
        horizon = HEIGHT * 0.25
        scale = 1 / max(0.2, z)
        road_half = WIDTH * 0.36 * scale
        y = horizon + (HEIGHT - horizon) * (1 - scale * 0.85)
        x = WIDTH // 2 + (lane_offset + self.curve * z) * road_half
        return x, y, road_half, scale

    def draw_background(self):
        self.screen.fill((7, 10, 22))
        for i in range(280):
            pygame.draw.line(self.screen, (15 + i // 2, 30 + i // 3, 70 + i // 3), (0, i), (WIDTH, i))
        pygame.draw.rect(self.screen, (13, 40, 20), (0, HEIGHT * 0.25, WIDTH, HEIGHT))

    def draw_road(self):
        for i in range(130, 1, -1):
            z1 = i / 130
            z2 = (i - 1) / 130
            x1, y1, half1, _ = self.project(0, z1)
            x2, y2, half2, _ = self.project(0, z2)

            grass = (22, 82, 37) if i % 2 else (28, 96, 42)
            pygame.draw.rect(self.screen, grass, (0, y2, WIDTH, max(1, y1 - y2)))

            road = (45, 45, 54) if i % 2 else (35, 35, 45)
            pygame.draw.polygon(self.screen, road, [(x1 - half1, y1), (x1 + half1, y1), (x2 + half2, y2), (x2 - half2, y2)])

            if i % 9 == 0:
                mw1, mw2 = half1 * 0.05, half2 * 0.05
                pygame.draw.polygon(self.screen, (240, 240, 245), [(x1 - mw1, y1), (x1 + mw1, y1), (x2 + mw2, y2), (x2 - mw2, y2)])

    def draw_player(self):
        x, y = int(self.player.x), int(self.player.y)
        body = pygame.Rect(x - 62, y - 118, 124, 118)
        pygame.draw.rect(self.screen, (20, 220, 255), body, border_radius=9)
        pygame.draw.rect(self.screen, (12, 25, 38), (x - 42, y - 102, 84, 34), border_radius=6)
        pygame.draw.rect(self.screen, (20, 20, 20), (x - 56, y - 18, 42, 16), border_radius=4)
        pygame.draw.rect(self.screen, (20, 20, 20), (x + 14, y - 18, 42, 16), border_radius=4)

        if self.player.nitro < 40:
            glow = random.randint(24, 52)
            pygame.draw.rect(self.screen, (255, 145, 40), (x - 15, y - 2, 12, glow), border_radius=5)
            pygame.draw.rect(self.screen, (255, 145, 40), (x + 3, y - 2, 12, glow), border_radius=5)

    def draw_traffic(self):
        for car in sorted(self.traffic, key=lambda c: c.z, reverse=True):
            lane_offset = car.lane * 0.58 - ((self.player.x - WIDTH // 2) / 330)
            x, y, _, scale = self.project(lane_offset, car.z)
            w, h = int(130 * scale), int(190 * scale)
            if h < 14:
                continue
            rect = pygame.Rect(int(x - w / 2), int(y - h), w, h)
            pygame.draw.rect(self.screen, car.color, rect, border_radius=6)
            pygame.draw.rect(self.screen, (8, 8, 10), (rect.x + int(w * 0.16), rect.y + int(h * 0.12), int(w * 0.68), int(h * 0.24)), border_radius=5)

    def check_collisions(self):
        px, py = self.player.x, self.player.y - 60
        for car in self.traffic:
            lane_offset = car.lane * 0.58 - ((self.player.x - WIDTH // 2) / 330)
            x, y, _, scale = self.project(lane_offset, car.z)
            if y > HEIGHT - 240 and abs(x - px) < 70 and abs((y - 60 * scale) - py) < 55:
                self.player.alive = False
                self.best = max(self.best, self.score)
                return

    def draw_hud(self):
        speed = self.font.render(f"Velocidad: {int(self.player.speed)} km/h", True, (220, 240, 255))
        score = self.font.render(f"Puntaje: {self.score}", True, (220, 240, 255))
        best = self.font.render(f"Record: {self.best}", True, (220, 240, 255))
        nitro = self.font.render(f"Nitro: {int(self.player.nitro)}%", True, (255, 200, 120))

        self.screen.blit(speed, (20, 18))
        self.screen.blit(score, (20, 46))
        self.screen.blit(best, (20, 74))
        self.screen.blit(nitro, (20, 102))

        pygame.draw.rect(self.screen, (30, 30, 40), (20, 134, 220, 16), border_radius=8)
        pygame.draw.rect(self.screen, (75, 210, 255), (20, 134, int(220 * self.player.nitro / 100), 16), border_radius=8)

        if not self.player.alive:
            txt = self.big.render("CHOQUE - Presiona R", True, (255, 80, 80))
            self.screen.blit(txt, (WIDTH // 2 - txt.get_width() // 2, HEIGHT // 2 - 20))

    def reset(self):
        self.player = Player()
        self.traffic = [TrafficCar() for _ in range(13)]
        self.score = 0
        self.distance = 0
        self.curve = 0
        self.curve_target = 0
        self.curve_timer = 0

    def run(self):
        while self.running:
            dt = self.clock.tick(FPS) / 1000
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                if event.type == pygame.KEYDOWN and event.key == pygame.K_r and not self.player.alive:
                    self.reset()

            keys = pygame.key.get_pressed()
            if self.player.alive:
                self.player.update(dt, keys)
                self.curve_timer -= dt
                if self.curve_timer <= 0:
                    self.curve_target = random.uniform(-0.8, 0.8)
                    self.curve_timer = random.uniform(1.6, 3.8)
                self.curve += (self.curve_target - self.curve) * dt * 0.7

                for car in self.traffic:
                    car.update(dt, self.player.speed)
                self.check_collisions()

                self.distance += self.player.speed * dt
                self.score += int(self.player.speed * dt * 0.55)

            self.draw_background()
            self.draw_road()
            self.draw_traffic()
            self.draw_player()
            self.draw_hud()
            pygame.display.flip()

        pygame.quit()
        sys.exit()


if __name__ == "__main__":
    Game().run()
