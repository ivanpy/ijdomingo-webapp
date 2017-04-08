angular.module('app').controller('AlumnoModalController', AlumnoModalController);

function AlumnoModalController(ApiService, $uibModalInstance, $timeout) {

    var self = this;

    self.mostarMensaje = false;
    self.toggl = false;    

    // Meotod que guarda los datos de alumnos
    self.guardar = function () {
        var body = new alumnoJsonBody();
        body.dni = self.dni;
        body.nombre = self.nombre;
        body.apellido = self.apellido;
        body.nacionalidad = self.nacionalidad;
        body.fecnac = self.fecnac;
        body.sexo = self.sexo;
        body.fijo = self.fijo;
        body.celular = self.celular;
        body.email = self.email;
        body.provincia = self.provincia;
        body.localidad = self.localidad;
        body.ocupacion = self.ocupacion;
        ApiService.guardarAlumno(body)
           .then(function (response) {
                self.toggl = true;    
                alerta("__exito_al_guardar");
           }, function (error) {
                self.toggl = false;  
                self.showMessage("_error");
                alerta("__error_al_guardar");
           });
        // En caso de querer cerrar el modal automaticamente         
        // $uibModalInstance.close(self);
        
    };

    // Metodo que cierra el modal
    self.cerrar = function () {
        $uibModalInstance.close(self);
        //$uibModalInstance.dismiss('cancel');
    }

    // Contrato para guardar alumnos
    var alumnoJsonBody = function () {
        return {
            "nombre" : "",
            "apellido" : "",
            "nacionalidad" : "",
            "fecnac" : "",
            "dni" : "",
            "sexo" : "",
            "email" : "",
            "fijo" : "",
            "celular" : "",
            "provincia" : "",
            "localidad" : "",
            "ocupacion" : ""
        }
    }

    // Metodo que muestra los mensajes de errores
    var alerta = function (validation) {
        self.mostarMensaje = true;
        switch (validation) {
            case "__error_al_guardar":
                self.alertMsg = "Error al guardar los datos del alumno";
                self.alert = 'alert alert-danger alert-dismissible';
                self.alertType = 'Error';
                break;
            case "__exito_al_guardar":
                self.alertMsg = "Los datos del alumno se guardaron exitosamente";
                self.alert = 'alert alert-success alert-dismissible';
                self.alertType = 'Exito';
                break;
        }
        $timeout(function () {  self.mostarMensaje = false; }, 1000);
    }
}
