# Next.js Margaret Art Store

Para correr localmente, se necesita la DB
```
docker-compose up -d
```

* Reconstruir los modulos de node y levantar NEXT

```bash
yarn install
yarn dev
```

## Configurar las variables de entorno

* Renombrar el archivo __.env.template__ a __.env__

* MongoDB URL local:

```
mongodb://localhost:27017/margaretdb
```

## Llenar la DB con información de pruebas

```
http://localhost:3000/api/seed
```