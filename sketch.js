var trex, trex_correndo, trex_colidiu;

var solo, soloinvisivel, imagemdosolo;

var nuvem, grupoDeNuvens, imagemdanuvem;

var obstaculo, imgObstaculo1, imgObstaculo2, imgObstaculo3, imgObstaculo4, imgObstaculo5, imgObstaculo6, grupoDeObstaculos;

var somMorte, somSalto, somCheckPoint;

var fimJogo, reiniciar, fimJogoImagem, reiniciarImagem;

var pontuacao;

var jogar = 1;

var encerrar = 0;

var estadoJogo = jogar;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  fimJogoImagem = loadImage("gameOver.png");
  
  reiniciarImagem = loadImage("restart.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
 
  imgObstaculo1 = loadImage("obstacle1.png");
  
  imgObstaculo2 = loadImage("obstacle2.png");
  
  imgObstaculo3 = loadImage("obstacle3.png");
  
  imgObstaculo4 = loadImage("obstacle4.png");
  
  imgObstaculo5 = loadImage("obstacle5.png");
  
  imgObstaculo6 = loadImage("obstacle6.png");

  somMorte = loadSound("die.mp3");
  
  somSalto = loadSound("jump.mp3");
  
  somCheckPoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  //trex.addAnimation("running", trex_correndo);
  trex.addAnimation("morreu",trex_colidiu);
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  
  fimJogo = createSprite(300, 100);
  fimJogo.addImage(fimJogoImagem);
  fimJogo.scale = 0.5;
  
  reiniciar = createSprite(300, 140);
  reiniciar.addImage(reiniciarImagem);
  reiniciar.scale = 0.5;
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  pontuacao = 0;
  
  trex.setCollider("circle", 0, 0, 40);
  
  grupoDeNuvens = new Group();
  grupoDeObstaculos = new Group();
}

function draw() {
  background(180);
  
  text("Pontuação: " +pontuacao, 450, 50);
  
  
  
  if(estadoJogo === jogar){
    fimJogo.visible = false;
    reiniciar.visible = false;
    
    solo.velocityX = -4;
    
    pontuacao = pontuacao + Math.round (frameCount / 100);
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    if(keyDown("space")&& trex.y >= 160) {
     trex.velocityY = -13;
     somSalto.play();
    }
    
     //chamar funçao gerarObstaculos
     gerarObstaculos();
    
    //gerar as nuvens
    gerarNuvens();
  
    if (pontuacao % 1000 === 0 && pontuacao > 0){
      somCheckPoint.play();
    }
    
    if(grupoDeObstaculos.isTouching(trex)){
       estadoJogo = encerrar;
      trex.changeAnimation("morreu", trex_colidiu);
      somMorte.play();
      }
   
  }else if(estadoJogo === encerrar){
    solo.velocityX = 0;
    
    grupoDeNuvens.setVelocityXEach(0);
    grupoDeObstaculos.setVelocityXEach(0);
    grupoDeNuvens.setLifetimeEach(-1);
    grupoDeObstaculos.setLifetimeEach(-1);
    
    trex.velocityY = 0;
    
    fimJogo.visible = true;
    reiniciar.visible = true;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  trex.collide(soloinvisivel);
  
  drawSprites();
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(imagemdanuvem)
    nuvem.y = Math.round(random(10,60))
    nuvem.scale = 0.4;
    nuvem.velocityX = -3;
    
    
    //atribuir tempo de duração à variável
    nuvem.lifetime = 210
    
    //ajustando a profundidade
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;
   
    grupoDeNuvens.add(nuvem);
    }
}

function gerarObstaculos(){
  //da um tempo para a criaçao das variaveis
  if (frameCount % 60 === 0){
   obstaculo = createSprite(600, 165, 10, 40);
  obstaculo.velocityX = -6;
  
  var rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstaculo.addImage(imgObstaculo1);
      break;
      
      case 2: obstaculo.addImage(imgObstaculo2);
      break;
      
      case 3: obstaculo.addImage(imgObstaculo3);
      break;
      
      case 4: obstaculo.addImage(imgObstaculo4);
      break;
      
      case 5: obstaculo.addImage(imgObstaculo5);
      break;
      
      case 6: obstaculo.addImage(imgObstaculo6);
      break;
      
      default: break;
  }
    obstaculo.scale = 0.5;
    
    obstaculo.lifetime = 210
  
    grupoDeObstaculos.add(obstaculo);
  }
}