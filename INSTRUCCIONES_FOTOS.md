# 📸 Instrucciones para Reemplazar Fotos del Equipo

## Imágenes que necesitas agregar:

### 1. **Alejandra** (Directora Comercial)
- **Archivo a crear**: `assets/images/alejandra.jpg`
- **Foto**: La imagen que compartiste (mujer con gorra Adidas)
- **Pasos**:
  1. Guarda la foto de Alejandra como `alejandra.jpg`
  2. Cópiala a la carpeta `assets/images/`
  3. Actualiza el HTML cambiando:
     - De: `src="https://i.pravatar.cc/400?img=47"`
     - A: `src="assets/images/alejandra.jpg"`

### 2. **Juan David Velasquez** (Director de Tecnología)
- **Archivo a crear**: `assets/images/juandavid.jpg`
- **Foto**: Necesitas proporcionar la foto de Juan David
- **Pasos**:
  1. Guarda la foto de Juan David como `juandavid.jpg`
  2. Cópiala a la carpeta `assets/images/`
  3. Actualiza el HTML cambiando:
     - De: `src="https://i.pravatar.cc/400?img=33"`
     - A: `src="assets/images/juandavid.jpg"`

## 🔧 Cómo actualizar en el código:

Abre el archivo `index.html` y busca las líneas correspondientes en la sección de equipo:

```html
<!-- Para Alejandra -->
<img src="https://i.pravatar.cc/400?img=47" alt="Alejandra">
<!-- Cambiar por -->
<img src="assets/images/alejandra.jpg" alt="Alejandra">

<!-- Para Juan David -->
<img src="https://i.pravatar.cc/400?img=33" alt="Juan David Velasquez">
<!-- Cambiar por -->
<img src="assets/images/juandavid.jpg" alt="Juan David Velasquez">
```

## ✅ Verificación:

Después de copiar las imágenes, recarga la página en tu navegador (http://localhost:8000) y verifica que las fotos se muestren correctamente.

---

**Nota**: Las imágenes actuales son placeholders temporales. Reemplázalas con las fotos reales del equipo.
