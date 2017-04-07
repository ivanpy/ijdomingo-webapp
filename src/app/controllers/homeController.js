angular.module('app').controller('HomeController', HomeController);
    
function HomeController(ApiService, $log){
  
var self = this;
  
  
self.hello = 'Welcome to Home Page!';
self.alumnos = []
	
// Lista de alumnos
ApiService.obtenerAlumnos()
  .then(function(response){
    self.alumnos = response;
    $log.warn("Alumnos: " + JSON.stringify(self.alumnos));
  });

}