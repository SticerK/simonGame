let app = new Vue({
    el: "#app",
    data: {
        
          order: [], //порядок
          playerOrder: [], //порядок, с которым нажимает игрок
          round: "", // раунд этого безумия
          turn: 1,
          flash: null,
          compTurn: null,
          on: null,
          gameInterval: null,
          correctAns: null,
          speed: 1000,
          win: null,
        },
      methods: {
        gameTurn() {
          this.on = false
          if(this.flash == this.turn){
            clearInterval(this.gameInterval)
            this.compTurn = false
            this.resetColor()
            this.on = true
          }
          if(this.compTurn){
            this.resetColor()
            setTimeout(() =>{
              console.log("Hi");
              if (this.order[this.flash] == 1) this.TLitem();
              if (this.order[this.flash] == 3) this.BLitem();
              if (this.order[this.flash] == 2) this.TRitem();
              if (this.order[this.flash] == 4) this.BRitem();
              this.flash++;
            },200)
          }
        },
        resetColor() {
          this.$refs.red.style.background = "rgb(255, 66, 66)";
          this.$refs.green.style.background = "rgb(0, 161, 22)";
          this.$refs.blue.style.background = "rgb(70, 150, 255)";
          this.$refs.yellow.style.background = "rgb(239, 255, 19)";
        },
    
        TLitem() {
          this.$refs.audio1.play()
          if (this.speed == 400){
            this.$refs.audio1.playbackRate = 2
          }
          this.$refs.red.style.background = "rgb(248, 17, 17)";
        },
        TRitem() {
          if (this.speed == 400){
            this.$refs.audio3.playbackRate = 2
          }
          this.$refs.audio3.play()
          this.$refs.blue.style.background = "rgb(1, 93, 212)";
        },
        BLitem() {
          if (this.speed == 400){
            this.$refs.audio2.playbackRate = 2
          }
          this.$refs.audio2.play()
          this.$refs.green.style.background = "rgb(1, 128, 18)";
        },
        BRitem() {
          if (this.speed == 400){
            this.$refs.audio4.playbackRate = 2
          }
          this.$refs.audio4.play()
          this.$refs.yellow.style.background = "rgb(201, 181, 0)";
        },
        start() {
          this.order = [];
          this.win = false
          this.playerOrder= []
          this.correctAns = true
          this.round = 1;
          this.flash = 0
          this.turn = 1
          this.gameInterval = 0
          for (let i = 0; i < 10; i++) {
            this.order.push(parseInt(Math.random() * 4 + 1));
          }
          this.compTurn = true
          this.gameInterval = setInterval(this.gameTurn, this.speed);
        },
        clickRed(){
          if(this.on){
            this.playerOrder.push(1)
            this.check()
            this.TLitem()
            setTimeout(this.resetColor, 300)
          }
          
        },
        clickGreen(){
          if(this.on){
            this.playerOrder.push(3)
            this.check()
            this.BLitem()
            setTimeout(this.resetColor, 300)
            console.log(this.playerOrder)
          }
          
        },
        clickBlue(){
          if(this.on){
            this.playerOrder.push(2)
            this.check()
            this.TRitem()
            setTimeout(this.resetColor, 300)
          }
          
        },
        clickYellow(){
          if(this.on){
            this.playerOrder.push(4)
            this.check()
            this.BRitem()
            setTimeout(this.resetColor, 300)
          }
          
        },
        check(){
           if(this.playerOrder[this.playerOrder.length - 1] !== this.order[this.playerOrder.length - 1]){
            this.correctAns = false
            
          }
    
          if(this.correctAns == false){
            this.round = "I'm sorry but the answer is wrong"
             
           
          }
          
          if(this.playerOrder.length == 10 && this.correctAns)
            this.winGame()
    
          
          if(this.turn == this.playerOrder.length && this.correctAns && !this.win){
            this.turn++
            this.round++
            this.playerOrder = []
            this.compTurn = true
            this.flash = 0
            this.gameInterval = setInterval(this.gameTurn, this.speed)
          }
         
          
         
        },
        winGame(){
          this.win = true
          this.on = false
          this.round = "Победа!"
        },
         easy(){
          clearInterval(this.gameInterval)
          this.speed = 1500
          this.start()
        },
        medium(){
          clearInterval(this.gameInterval)
          this.speed = 1000
          this.start()
        },
        hard(){
          clearInterval(this.gameInterval)
          this.speed = 400
          this.start()
        }
        
      },
      
      

})

