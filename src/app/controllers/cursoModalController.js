angular.module('app').controller('CursoModalController', CursoModalController);

function CursoModalController($log, ApiService, $uibModalInstance, $timeout, cursoEdit) {

    var self = this;

    

    var init = function () {
        self.mostarMensaje = false;
        self.toggl = false;    
        self.stateEdition = '';
        if(!angular.isUndefined(cursoEdit.id)){
            self.titulo = "Editar Curso";
            self.id = cursoEdit.id;
            self.nombre = cursoEdit.nombre;
        }else{
            self.titulo = "Agregar Nuevo Curso";
            self.nombre = '';
        }
    }

    self.onClickGuardar = function (){
        if(self.titulo == 'Agregar Nuevo Curso'){
            self.guardar();
        }else{
            self.editar();
        }
    }

    // Metodo que guarda los datos de alumnos
    self.guardar = function () {
        ApiService.guardarCurso({ "nombre" : self.nombre })
           .then(function (response) {
                self.toggl = true; 
                self.nombre = '';
                alerta("__exito_al_guardar");
           }, function (error) {
                self.toggl = false;  
                alerta("__error_al_guardar");
           });
        // En caso de querer cerrar el modal automaticamente         
        // $uibModalInstance.close(self);
        
    };

    self.editar = function () {
        ApiService.editarCurso(self.id, { "nombre" : self.nombre })
           .then(function (response) {
                self.toggl = true; 
                self.stateEdition = 'editado';
                $uibModalInstance.close(self);
           }, function (error) {
                self.toggl = false;
                self.stateEdition = 'error';
                $uibModalInstance.close(self);
           });
    };

    // Metodo que cierra el modal
    self.cerrar = function () {
        $uibModalInstance.close(self);
        //$uibModalInstance.dismiss('cancel');
    }

    // Metodo que muestra los mensajes de errores
    var alerta = function (validation) {
        self.mostarMensaje = true;
        switch (validation) {
            case "__error_al_guardar":
                self.alertMsg = "Error al guardar el curso";
                self.alert = 'alert alert-danger alert-dismissible';
                self.alertType = 'Error';
                break;
            case "__exito_al_guardar":
                self.alertMsg = "Curso guardado exitosamente";
                self.alert = 'alert alert-success alert-dismissible';
                self.alertType = 'Exito';
                break;
        }
        $timeout(function () {  self.mostarMensaje = false; }, 2000);
    }

    init();
}
