angular.module('app').controller('AsistenciaController', AsistenciaController);
    
function AsistenciaController(ApiService, $log, $uibModal, $timeout){
  
	var self = this;
  	self.mostarMensaje = false;
    self.alumnoAsitencia = undefined;
	
	// Metodo que genera la lista de inscripciones
	self.obtenerInscripciones = function () {
		self.inscripciones = [];
		ApiService.buscarInscripciones().then(function(response){
	    	self.inscripciones = response.data.inscripcion;
		});
	}

    // Meotod que guarda los datos de alumnos
    self.buscarAsistencia = function () {
        self.registrandoAsistencia();
        var fecha = getDatetime();
        ApiService.buscarAsistenciaPorDniYCurso(self.alumnoAsitencia.dni, self.alumnoAsitencia.curso, fecha).then(function(response){
            if(response.data.asitenciasAlumno.length > 0){
                alerta("__advertencia_ya_asistencia");
                self.alumnoAsitencia = undefined;
                self.registrarAsistencia();
            }else{
                self.guardarAsistencia();
            }
        }, function (error) {
            $log.error("Error al buscar la asistencia");
            self.registrarAsistencia();
        });
    }

    // Metodo que guarda la asistencia
    self.guardarAsistencia = function (){
        var asistencia = new asistenciaJsonBody();
        asistencia.dni = self.alumnoAsitencia.dni;
        asistencia.alumno = self.alumnoAsitencia.alumno;
        asistencia.fecasis = getDatetime();
        asistencia.curso = self.alumnoAsitencia.curso;
        ApiService.guardarAsistencia(asistencia).then(function (response) {
            alerta("__exito_al_guardar");
            self.alumnoAsitencia = undefined;
            self.registrarAsistencia();
        }, function (error) {
            $log.info(error);
            alerta("__error_al_guardar");
            self.registrarAsistencia();
        });
    }


	// Metodo para mostrar modal del confirmacion para borrar un curso
    self.guardarOnClick = function(index, id) {
        if(!angular.isUndefined(self.alumnoAsitencia)){
            bootbox.confirm({
                title: "Resgistrar Asistencia",
                message: "¿Estas seguro que desea registrar esta asistencia?",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> No'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Si'
                    }
                },
                callback: function (result) {
                    if(result){
                      self.buscarAsistencia();
                    }
                }
            });
        }else{
            alerta("__asistencia_vacia");
        }
    }

    // Contrato para guardar asitencia
    var asistenciaJsonBody = function () {
        return {
            "dni" : "",
            "alumno" : "",
            "fecasis" : "",
            "curso" : "",
            "estado": ""
        }
    }

    // Metodo para manejar los estilos del boton cuando esta enviando la inscripcion
    self.registrandoAsistencia = function(){
        self.colorButton = "btn btn-default btn-lg";
        self.labelButton = "Guardando Asistencia";
        self.typeButton = "button";
        self.iconButton = "fa fa-spinner fa-pulse fa-lg fa-fw";
    }

    // Metodo para manejar los estilos del boton de enviar inscripcion
    self.registrarAsistencia = function(){
        self.colorButton = "btn btn-success btn-lg";
        self.labelButton = "Resgistrar Asistencia";
        self.typeButton = "submit";
        self.iconButton = "glyphicon glyphicon-ok-circle";
    }

	// Metodo que muestra los mensajes de errores
    var alerta = function (validation) {
        self.mostarMensaje = true;
        switch (validation) {
            
            case "__advertencia_ya_asistencia":
                self.icon = 'glyphicon glyphicon-exclamation-sign';
                self.alertMsg = "La asistencia para este alumno ya fue registrada.";
                self.alert = 'alert alert-warning ui-notification';
                break;
            case "__exito_al_guardar":
                self.icon = 'glyphicon glyphicon-ok-sign';
                self.alertMsg = "La asistencia se registro con éxito.";
                self.alert = 'alert alert-success ui-notification';
                break;
            case "__error_al_guardar":
                self.icon = 'glyphicon glyphicon-remove-sign';
                self.alertMsg = "Error al registrar la asistencia, vuelva a intentarlo nuevamente.";
                self.alert = 'alert alert-danger ui-notification';
                break;
            case "__asistencia_vacia":
                self.icon = 'glyphicon glyphicon-info-sign';
                self.alertMsg = "Debe seleccionar un alumno para registrar la asistencia.";
                self.alert = 'alert alert-info ui-notification';
                break;
        }
        $timeout(function () {  self.mostarMensaje = false; }, 5000);
    }

    // Metodo para traer la fecha local del sistema
    var getDatetime = function() {
        var fec = Date.parse(new Date()).toString('dd/MM/yyyy');
        return fec;
    };

  	// Hago la llamada a todos los servicios que traer datos
	self.obtenerInscripciones();
    self.registrarAsistencia();
}