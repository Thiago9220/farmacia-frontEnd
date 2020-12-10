(function () {
	"use strict";

	var farmacia = angular.module("farmacia");

	farmacia.controller("controlador", controlador);

	controlador.$inject = ["$scope", "$http"];

	function controlador($scope, $http) {

		var vm = this;
		vm.HOST_HTTP = "http://localhost:3334/";
//	vm.HOST_HTTP = "https://farmacia-backend.herokuapp.com/";
		var atualizar = document.querySelector("#atualizar");
		var enviar = document.querySelector("#enviar");

		vm.funcionario = {};
		vm.funcionarios = [];

		vm.produto = {};
		vm.produtos = [];

		vm.cliente = {};
		vm.clientes = [];

		vm.clear = function () {
			vm.funcionario = {};
			vm.produto = {};
			vm.cliente = {};	
		};

		vm.init = function () {
			vm.lista_funcionarios();
			vm.lista_produtos();
			vm.lista_clientes();
		};

		// Funcionario
		vm.lista_funcionarios = function () {
			$http
				.get(vm.HOST_HTTP + "funcionario/")
				.then(function (res) {
					vm.funcionarios = res.data;
				})
				.catch(function (err) {
					console.log(err);
				});
		};

		vm.cadastrar_funcionario = function () {
			$http
				.post(vm.HOST_HTTP + "funcionario/", vm.funcionario)
				.then(function (res) {
					vm.funcionarios.push(angular.copy(vm.funcionario));
					vm.clear();
				})
				.catch(function (err) {
					console.log(err);
					vm.clear();
				});
		};

		vm.atualizar_funcionario = function (indice, funcionario) {
			funcionario = vm.funcionarios[indice]._id;
			$http.put(vm.HOST_HTTP + "funcionario/" + funcionario, vm.funcionario).then(
				function (res) {
					atualizar.classList.toggle("hidden");
					enviar.classList.toggle("hidden");
					vm.clear();
					vm.lista_funcionarios();
				},
				function (err) {
					console.log(err);
				}
			);
		};


		vm.deletar_funcionario = function (indice, funcionario) {
			funcionario = vm.funcionarios[indice]._id;
			$http.delete(vm.HOST_HTTP + "funcionario/" + funcionario, vm.funcionario).then(
				function (res) {
					vm.clear();
					vm.lista_funcionarios();
				},
				function (err) {
					console.log(err);
				}
			);
		};

		// Produto
		vm.lista_produtos = function () {
			$http
				.get(vm.HOST_HTTP + "produto/")
				.then(function (res) {
					vm.produtos = res.data;
				})
				.catch(function (err) {
					console.log(err);
				});
		};

		vm.cadastrar_produto = function () {
			$http
				.post(vm.HOST_HTTP + "produto/", vm.produto)
				.then(function (res) {
					vm.produtos.push(angular.copy(vm.produto));
					vm.clear();
				})
				.catch(function (err) {
					console.log(err);
					vm.clear();
				});
		};

		vm.deletar_produto = function (indice, produto) {
			produto = vm.produtos[indice]._id;
			$http.delete(vm.HOST_HTTP + "produto/" + produto, vm.produto).then(
				function (res) {
					vm.clear();
					vm.lista_produtos();
				},
				function (err) {
					console.log(err);
				}
			);
		};

		// Cliente
		vm.lista_clientes = function () {
			$http
				.get(vm.HOST_HTTP + "cliente/")
				.then(function (res) {
					vm.clientes = res.data;
				})
				.catch(function (err) {
					console.log(err);
				});
		};

		vm.cadastrar_cliente = function () {
			$http
				.post(vm.HOST_HTTP + "cliente/", vm.cliente)
				.then(function (res) {
					vm.clientes.push(angular.copy(vm.cliente));
					vm.clear();
				})
				.catch(function (err) {
					console.log(err);
					vm.clear();
				});
		};

		vm.atualizar_cliente = function (indice, cliente) {
			cliente = vm.clientes[indice]._id;
			$http.put(vm.HOST_HTTP + "cliente/" + cliente, JSON.stringify(vm.cliente)).then(
				function (res) {
					atualizar.classList.toggle("hidden");
					enviar.classList.toggle("hidden");
					vm.clear();
					vm.lista_clientes();
				},
				function (err) {
					console.log(err);
				}
			);
		};

		vm.deletar_cliente = function (indice, cliente) {
			cliente = vm.clientes[indice]._id;
			$http.delete(vm.HOST_HTTP + "cliente/" + cliente, vm.cliente).then(
				function (res) {
					vm.clear();
					vm.lista_clientes();
				},
				function (err) {
					console.log(err);
				}
			);
		};

		// ---------------------------------------------------------------------------------------


		// var aviaozin = null;


		// vm.aluno = {};
		// vm.alunos = [];

		// vm.init = function () {
		// 	vm.listaAlunos();
		// };

		// vm.clear = function () {
		// 	vm.aluno = {};
		// };

		// // GET
		// vm.listaAlunos = function () {
		// 	$http
		// 		.get(vm.HOST_HTTP + "/users/")
		// 		.then(function (res) {
		// 			vm.alunos = res.data.users;
		// 		})
		// 		.catch(function (err) {
		// 			console.log(err);
		// 		});
		// };

		// // POST
		// vm.cadastrarAluno = function () {
		// 	$http
		// 		.post(vm.HOST_HTTP + "/users/", vm.aluno)
		// 		.then(function (res) {
		// 			vm.alunos.push(angular.copy(vm.aluno));
		// 			vm.clear();
		// 		})
		// 		.catch(function (err) {
		// 			console.log(err);
		// 			vm.clear();
		// 		});
		// };

		// // PUT
		// vm.carregarCadastro = function (indice, aluno) {
		// 	atualizar.classList.toggle("hidden");
		// 	enviar.classList.toggle("hidden");

		// 	aviaozin = vm.alunos[indice]._id;
		// };

		// vm.alterarCadastro = function (indice, aluno) {
		// 	aluno = aviaozin;
		// 	console.log(aluno);
		// 	$http.put(vm.HOST_HTTP + "/users/" + aluno, vm.aluno).then(
		// 		function (res) {
		// 			console.log("Funfando");
		// 			vm.clear();
		// 			vm.listaAlunos();
		// 			atualizar.classList.toggle("hidden");
		// 			enviar.classList.toggle("hidden");
		// 		},
		// 		function (err) {
		// 			console.log(err);
		// 		}
		// 	);
		// };

		// // DELETE
		// vm.deletarCadastro = function (indice, aluno) {
		// 	aluno = vm.alunos[indice]._id;
		// 	console.log(aluno);
		// 	$http.delete(vm.HOST_HTTP + "/users/" + aluno, vm.aluno).then(
		// 		function (res) {
		// 			vm.clear();
		// 			vm.listaAlunos();
		// 		},
		// 		function (err) {
		// 			console.log(err);
		// 		}
		// 	);
		// };
	}
})();
