# Tecnicatura en Programación - UTN FRA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Laboratorio IV - TP Final

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Clinica

## Descripcion
“La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad), dos laboratorios (físicos en la clínica), y una sala de espera general. Está abierta al público de lunes a viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.

Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su
disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web seleccionando el profesional o la especialidad. La duración mínima de un turno es 30 minutos.” pero los profesionales pueden cambiar la duración según su especialidad. Estos profesionales pueden tener más de una especialidad.
También contamos con un sector dentro de la clínica que se encarga de la organización y
administración de la misma.

## Registro

Los usuarios pueden registrarse segun su perfil: paciente o especialista. Existe el perfinl de administrador que solo puede ser generado por otro administrador.
Los usuarios con perfil Paciente solo pueden ingresar si verificaron su mail al
momento de registrarse.
Los usuarios con perfil Especialista solo pueden ingresar si un usuario administrador
aprobó su cuenta y verificó el mail al momento de registrarse.

## Turnos

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
