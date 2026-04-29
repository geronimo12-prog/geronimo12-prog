# PC Titan Ultra Landing Page

Página estática en español para mostrar accesorios de PC top de gama.

## Cómo hacer que funcione

### Opción 1 (rápida)
1. Descarga/clona el repo.
2. Abre el archivo `index.html` con doble clic en tu navegador.

### Opción 2 (recomendada, servidor local)
Desde la carpeta del proyecto ejecuta:

```bash
python3 -m http.server 5500
```

Luego abre:

- http://localhost:5500/index.html

## Estructura
- `index.html`: contiene todo (HTML + CSS), no requiere dependencias ni instalación.

## Solución de problemas
- Si la página sale en blanco, confirma que `index.html` exista en la raíz.
- Si no abre `localhost`, revisa que el puerto 5500 no esté ocupado.
- Si usas VS Code, también puedes usar "Live Server" y abrir el archivo con ese plugin.
