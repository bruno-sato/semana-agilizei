#language: pt
Funcionalidade: Listagem

  Feature Description

Cenário: Listagem sem registros
  Dado que o site não possui registros
  Quando acessar a listagem
  Então devo visualizar a listagem vazia

Cenário: Listagem com apenas um registro
  Dado que o site possui apenas um registro
  Quando acessar a listagem
  Então devo visualizar apenas um registro