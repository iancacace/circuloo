'use strict';
document.addEventListener ('DOMContentLoaded', function () {

const arriba = document.querySelector('.arriba')
const abajo = document.querySelector('.abajo')
const izquierda = document.querySelector('.izquierda')
const derecha = document.querySelector('.derecha')
const circulo = document.querySelector('.circulo')
const rojo = document.querySelector('.rojo')
const verde = document.querySelector('.verde')
const azul = document.querySelector('.azul')
const aleatorio = document.querySelector('.aleatorio')
const container = document.querySelector('.container')
const mas = document.querySelector('.mas')
const menos = document.querySelector('.menos')
let colores;

//movimiento//

	//flechas
	arriba.onclick = function(){
		up()
		reaparecer()
	}
	abajo.onclick = function(){
	down()
	reaparecer()
	}
	izquierda.onclick = function(){
	left()
	reaparecer()
	}
	derecha.onclick = function(){
		right()
		reaparecer()
	}
	function up(){
		if(!requestId){	
			let valor = circulo.offsetTop
			circulo.style.top = valor - 100 + 'px'
		}else{
			alert('no puede mover el circulo mientras el "modo aleatorio" este activo')
		}
	}
	function down(){
		if (!requestId){	
			let valor = circulo.offsetTop
			circulo.style.top = valor + 100 + 'px'
		}else{
			alert('no puede mover el circulo mientras el "modo aleatorio" este activo')
			}
	}
	function left(){
		if(!requestId){	
			let valor = circulo.offsetLeft
			circulo.style.left = valor - 100 + 'px'
		}else{
			alert('no puede mover el circulo mientras el "modo aleatorio" este activo')
		}
	}
	function right(){
		if (!requestId){	
			let valor = circulo.offsetLeft
			circulo.style.left = valor + 100 + 'px'
		}else{
			alert('no puede mover el circulo mientras el "modo aleatorio" este activo')
			}
	}

	//teclas
	document.onkeydown = function(){teclas(event)}
	console.log(event)
	function teclas(event){
		reaparecer()
				if (event.key === 'ArrowUp') {
						up()
					} else if (event.key === 'ArrowDown') {
						down()
						}	else if (event.key === 'ArrowLeft') {
						left()
						} else if (event.key === 'ArrowRight') {
					 	right()						 		
				 		}
	}
	   	  
 // velocidad de movimiento

	const datos = circulo.getBoundingClientRect()
	const alto = datos.height
	const ancho = datos.width
	const alto2 = alto / 2
	const ancho2 = ancho / 2
	let	velocidad = {
			x: 4,
			y: -4
		}

	function rapido(){
		velocidad.y = velocidad.y*2
		velocidad.x = velocidad.x*2
	}
	function lento(){
		velocidad.y = velocidad.y/2
		velocidad.x = velocidad.x/2
	}
	let	conteo = 0	
	mas.onclick = function(){
		if(conteo <= 3){    	
		   rapido()
		   menos.style.visibility = "visible"
		   conteo++  
		}else{
			rapido()
			conteo++
			mas.style.visibility = "hidden"  
		}
	}
	menos.onclick = function(){
		if(conteo >= -2){    	
	      lento()
	      mas.style.visibility = "visible"
	      conteo--  
		}else{
			lento()
			conteo--
		   menos.style.visibility = "hidden"	        
		}
	}

//movimiento aleatorio		

	function reaparecer(){
		let datos = circulo.getBoundingClientRect()
		let posicionX = datos.x
		let posicionY = datos.y
		if(posicionX + ancho2 >= window.innerWidth) {
			circulo.style.left = -150 + 'px'
		}
		else if(posicionY + alto2 >= window.innerHeight) {
				circulo.style.top = -150 + 'px'
		}
		if(posicionX + ancho2 < 0) {
				circulo.style.left = container.clientWidth + 'px'
		}
		else if(posicionY + alto2 < 0) {
				circulo.style.top = container.clientHeight + 'px'
		}
	}
	var requestId;
	function start() {
		let datos = circulo.getBoundingClientRect()
		let posicionX = datos.x
		let posicionY = datos.y
		if(posicionX + ancho > window.innerWidth){			
			circulo.style.left = (container.clientWidth - ancho) + 'px'
		}
		if(posicionX < 0){
		circulo.style.left = 0
		}
		if(posicionY + alto > window.innerHeight){			
		circulo.style.top = (container.clientHeight - alto) + 'px'
		}
		 if(posicionY < 0){
		circulo.style.top = 0
		}
   	if(!requestId) {
	   requestId = window.requestAnimationFrame(bordes);
    	}
	}
	function stop() {
   	if(requestId) {
    	//console.log(requestId + ' stop')
   	window.cancelAnimationFrame(requestId);
   	requestId = undefined;
   	}
	}
	let cuenta = 0
	aleatorio.onclick = function(){
		colorDeBoton()
		if(cuenta == 1) {    	
	      stop()
	      cuenta = 0        
			}else{
		   bordes()
		   cuenta = 1    
	    }
  }
	function bordes(){
		requestId = undefined;
		start()
		medida()
		rebote()
	}
	function medida(){ 
		let datos = circulo.getBoundingClientRect()
		let posicionX = datos.x
		let posicionY = datos.y
		posicionX += velocidad.x
		posicionY += velocidad.y
		circulo.style.left = posicionX + 'px'
		circulo.style.top =  posicionY + 'px'
	}
	function rebote() {
		let datos = circulo.getBoundingClientRect()
		let posicionX = datos.x
		let posicionY = datos.y
		if(posicionX + ancho >= window.innerWidth) {
			setColor()
			velocidad.x = -velocidad.x
			cambiarColor()
		}
		if(posicionX <= 0) {
			setColor()
			velocidad.x = -velocidad.x
			cambiarColor() 
	//en el if anterior cambie el valor de la variable a negativo(sentido de movimiento), y ahora se niega el negativo dejandola como al principio (positivo)
		}
		if(posicionY + alto >= window.innerHeight) {
			setColor()
			velocidad.y = -velocidad.y
			cambiarColor()
			} 
		if(posicionY <= 0) {
			setColor()
			velocidad.y = -velocidad.y
			cambiarColor()
			}		
	}


//colores//

	//tablero
		rojo.onclick = function(){
			circulo.style.backgroundColor = "red"
		} 
		verde.onclick =  function(){
			circulo.style.backgroundColor = "green"
		} 
		azul.onclick = function(){
			circulo.style.backgroundColor = "blue"
		} 
		
	//color aleatorio	
		function cambiarColor(){
		  var letras = '0123456789ABCDEF'
		  var color = '#'
		  for (var i = 0; i < 6; i++) {
		    color += letras[Math.floor(Math.random() * 16)]
		    colores = color
		  }
		  console.log(colores)
		  return colores;
		}
		cambiarColor()
		function setColor(){circulo.style.backgroundColor = colores}
		let count = 0
	   function colorDeBoton() {
	     if(count == 1) {
	         aleatorio.style = 'background-color: red; opacity: 0.7;'
	         count = 0        
				}else{
		      aleatorio.style = 'background-color: #4cae4c; opacity: 0.7;'
		      count = 1
	        	}
	   	}
})

















/*

				 tiempo = undefined
				let contador = 1
				aleatorio.onclick = function(){
					     if (contador == 0) {	     
					     	window.clearInterval(tiempo)
					         contador = 1        
								}	else {
								tiempo =  window.setInterval(intervalo, 1000)
						        contador = 0    
					    }
					}
				
				intervalo()

				function intervalo(){


// mi intento de parar el modo aleatorio cuando clickeas de nuevo en el boton.
			let cuenta = 1
	   function parar() {
	     if (cuenta == 0) {
	        cancelAnimationFrame(bordes)
	         cuenta = 1        
				}	else {
		      	bordes()
		        cuenta = 0
	        		}
	    }

	    // mi intento de parar el modo aleatorio cuando clickeas de nuevo en el boton.
			let cuenta = 1
aleatorio.onclick = function(){
		colorDeBoton() 
	     if (cuenta == 0) {
	      		window.clearInterval(intervalo)
	         cuenta = 1        
				}	else {
		      	window.setInterval(intervalo, 1000)
		        cuenta = 0	    
	    }
	  }



................. como acceder a datos de una funcion y como devolver mas de 1 dato con return.

	function random() {
		let datos = circulo.getBoundingClientRect()
		let posicionX = datos.x
		let posicionY = datos.y
		posicionX += velocidad.x
		posicionY += velocidad.y

		return {
			posicionX: posicionX,
			posicionY: posicionY
		}
		}
const ian = random();
blabla = ian.posicionX 


	function recorrerY(){ 
		const datos = circulo.getBoundingClientRect()
		const alto = datos.height
		const ancho = datos.width
		const posicionX = datos.x
		const posicionY = datos.y

	for (var i = 0; i < 1; i++) {
		 		posicionY[i]
		 		return posicionY
		 }	
	for (var i = 0; i < 1; i++) {
		 		posicionX[i]
		 		return posicionX
		 		return posicionY
		 }




			function bordes(){
					if ( >= window.innerWidth) {
					lista.velocidad.x = -lista.velocidad.x
					}
			}

		
		

		function recorrer(){
		const datosLive = circulo.getBoundingClientRect()
		const posicionX = datosLive.x
		const posicionY = datosLive.y
		return {
			px: posicionX,
			py: posicionY
		}	
		}


	//jaja = new recorrer()


		function recorrerX(){ 
		const datos = circulo.getBoundingClientRect()
		const posicionX = datos.x
			for (var i = 0; i < 1; i++) {
				 		b = posicionX[i]
				 	
				 }	 
		}
		function recorrerY(){ 
			const datos = circulo.getBoundingClientRect()
			const posicionY = datos.y
			for (var i = 0; i < 1; i++) {
				 		a = posicionY[i]
				 		console.log(a)
				 }	 
		}

recorrerX();
recorrerY();





window.requestAnimationFrame(recorrer)





documento = window.getComputedStyle(circulo)
    top = documento.getPropertyValue('top')
    console.log(top)



	function cambiarColor() {

		if (cuenta == 1) {
				circulo.classList.remove('rojo')
				circulo.classList.remove('azul')
				circulo.classList.add('verde')
				cuenta++
			} else if (cuenta == 2) {
									circulo.classList.remove('rojo')
									circulo.classList.remove('verde')
									circulo.classList.add('azul')

									cuenta = 0
								}	else {
										circulo.classList.remove('verde')
										circulo.classList.remove('azul')
										circulo.classList.add('rojo')
										cuenta++
									}
									console.log(cuenta)
	}



// para ver el nombre de la tecla apretada en consola //
document.addEventListener ('keyup', function(event) {
console.log(event.key)
})








		function bla() { 
		let coords = circulo.getBoundingClientRect()
		for (var i = 0; i < 1; i++) {
			Math.floor(coords)

		console.log(coords.left)
		console.log(coords.top)

		}}



// maneras de extraer info sobre un elemento desde js

	// con .getBoundingClientRect()............ se obtiene una variable objeto con: width, height, top, bottom, left, right, x, y.
			const datos = circulo.getBoundingClientRect()
	// con .offset...................................con .offset+propiedad se obtiene el dato buscado en especifico		
			const alto = circulo.offsetHeight
			const ancho = circulo.offsetWidth









*/