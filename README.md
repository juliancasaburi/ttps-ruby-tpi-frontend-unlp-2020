# Ruby Notes

Trabajo Práctico Integrador de la cursada 2020 de la materia Taller de Tecnologías de Producción de Software - Opción Ruby, de la Facultad de Informática perteneciente a la Universidad Nacional de La Plata.

# Backend

El backend, desarrollado en Ruby On Rails se encuentra en el repositorio:

https://github.com/juliancasaburi/ttps-ruby-tpi-unlp-2020

# Frontend

Desarrollado utilizando [Vue.js](https://vuejs.org/) y el framework [Vuetify](https://vuetifyjs.com/en/)

## Instalación y configuración

### Clonar proyecto

```sh
$ git clone https://github.com/juliancasaburi/ttps-ruby-tpi-frontend-unlp-2020.git
```

### Crear una copia del archivo .env.example .env (También puede hacerse manualmente).

```sh
$ cp .env.example .env
```

### Editar el archivo `.env` con los datos de la [API](https://github.com/juliancasaburi/ttps-ruby-tpi-unlp-2020)

```
VUE_APP_API_URL=http://localhost:3000
VUE_APP_API_PREFIX=api/v1
```

### NPM

```sh
# Install dependencies
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Lints and fixes files
npm run lint
```

## Acceder al sitio

http://localhost:8080/
