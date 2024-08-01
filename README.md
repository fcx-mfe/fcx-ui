# Documentación del Proyecto

Este proyecto utiliza una arquitectura de Micro Frontends (MFEs) y está compuesto por varios módulos que deben ser gestionados de manera independiente. En este documento, encontrarás la información necesaria para ejecutar dos scripts importantes: uno para instalar las dependencias y otro para iniciar todas las aplicaciones (Micro FrontEnds).

## Version de NodeJS a usar

Se recomienda usar la version **NodeJS 18**

## Scripts Disponibles

### 1. Instalación de Dependencias

**Script:** `install-dependencies.sh`

**Descripción:** Este script instala las dependencias necesarias para cada uno de los proyectos del contenedor y los Micro Frontends (MFEs). Asegúrate de ejecutar este script antes de iniciar los proyectos para garantizar que todas las dependencias estén correctamente instaladas.

**Cómo Ejecutar:**

1. Abre una terminal.
2. Navega al directorio raíz del proyecto.
3. Ejecuta el siguiente comando:

   ```bash
   ./install-dependencies.sh


### 2. Inicio de aplicaciones (MFEs)

**Script:** `start.sh`

**Descripción:** Este script inicia los proyectos del contenedor y los Micro Frontends (MFEs). Debe ser ejecutado después de haber instalado las dependencias para iniciar todos los servicios necesarios.

**Cómo Ejecutar:**

1. Abre una terminal.
2. Navega al directorio raíz del proyecto.
3. Ejecuta el siguiente comando:

   ```bash
   ./start-projects.sh
