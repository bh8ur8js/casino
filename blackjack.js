class Deck {
    constructor() { 
      
         this.suits = ["♠", "♥", "♣", "♦"]
         this.faces = ["A",2,3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
         this.cards = []
         for (let suit of this.suits) {
            for  (let face of this.faces) {
                this.cards.push({ suit: suit, face: face })
            }
          }
        this.next_card_index = 51
        this.shuffle(this.cards) 
    }

    shuffle(cards) {
        let currentIndex = cards.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }
      return cards;
    }

     toString() {
         return "I am a deck of cards"    
    }
  
     deal_card() {
        this.next_card_index -= 1 ;
        return this.cards[this.next_card_index+1]
     };
  
    next_card() {
         return this.cards[this.next_card_index]
    }
  
     burn_card() {
        this.next_card_index -= 1
        return "Burn Card"
        }

     how_many_cards_remaining() {
        return this.next_card_index + 1
    }

     reshuffle() {
        this.next_card_index = 51
        this.shuffle(this.cards)
        return "Cards reshuffled"
        }
}

class Blackjack {
 
    constructor() {  
        this.deck  = new Deck()
        this.set_card_values()
        this.players_score = 0
        this.dealers_score = 0
        this.players_hand = []
        this.dealers_hand = []  
    }

    
    set_card_values() {
    
      for (let card of this.deck.cards) {
        switch(card.face) {
          case 'A':
            card.value = 1;
            break;
          case 'K':
          case 'Q':
          case 'J':
          case '10':
            card.value = 10;
            break;
          default:
            card.value = card.face;
        }
      }
    }

    html_card(card) {
      let color = '';
          if(['♥','♦'].includes(card.suit)) {
            color = 'text-red-500';
          }
          let card_center = "";
          let symbols = 0;
          let styling = "";
          switch (card.face) {
            case "A":
              symbols = 1;
              styling ="text-4xl font-bold"
              break;
            case "K":
              card_center = 'K'
              styling = "text-4xl font-bold";
              break;
              case "Q":
                card_center = 'Q'
                styling = "text-4xl font-bold";
                break;
                case "J":
                  card_center = 'J'
                  styling = "text-4xl font-bold";
                  break;
            default: symbols = card.value;
          }

         if(card_center=="") {
          for (let i = 1; i <= card.value; i++) {
            card_center += `<div class="mx-1">${card.suit}</div>`
          }
        }

      
      return `<div class="flex bg-white ${color} mx-2 h-28 w-16 flex-col justify-between rounded-md border-2 border-black text-xs">
      <div class="m-1">${card['face']}${card['suit']}</div>
      <div class="flex flex-wrap text-center justify-evenly ${styling}">
              ${card_center}
      </div>
      <div class="m-1 text-left rotate-180">${card['face']}${card['suit']}</div>
  </div>
      `
    }

    hit(hand) {
      let card = this.deck.deal_card();
      hand.push(card);
    }

    hitDealer() {
      this.hit(this.dealers_hand);
      var p = document.getElementById("dealers_cards")
      p.innerHTML += this.html_card(this.dealers_hand[this.dealers_hand.length-1])
      
     }
    

    hitPlayer() {
     this.hit(this.players_hand);
     var p = document.getElementById("players_cards")
     p.innerHTML += this.html_card(this.players_hand[this.players_hand.length-1])
     this.check_player();
    }

    play() {
      console.log('reset table');
      this.reset_table();
      console.log('deal hand');
      this.deal_hand();
      console.log('display deal');
      this.display_hand();      
      console.log('check player');
    }

    reset_table() {
      var d = document.getElementById('players_cards')
      var p = document.getElementById('dealers_cards');
      p.innerHTML = "";
      d.innerHTML = "";
      this.message("Let's Play")
    }

    deal_hand() {
      this.players_hand=[]
      this.dealers_hand=[]        
      this.players_hand.push(this.deck.deal_card())
      this.dealers_hand.push(this.deck.deal_card())
      this.players_hand.push(this.deck.deal_card())
      this.dealers_hand.push(this.deck.deal_card())
      this.toggleButtons() ;
    }

    display_hand() {
      var p = document.getElementById('players_cards')
      p.innerHTML += this.html_card(this.players_hand[0])
      p.innerHTML += this.html_card(this.players_hand[1])
      var d = document.getElementById('dealers_cards')
      d.innerHTML += this.html_card(this.dealers_hand[0])
    }

    has_blackjack(hand) {
        return this.best_hand(hand) == 21 &&  hand.length == 2;
    }

    is_bust(hand) {
      return this.best_hand(hand) == -1;
    }

    not_bust(hand) {
      return this.best_hand(hand) != -1;
    }

    check_player() {
      if (this.has_blackjack(this.players_hand)) {
          this.message('BlackJack!!')
          this.toggleButtons();     
      }
      if (this.is_bust(this.players_hand)) {
          this.message('You Bust!!')                  
      this.toggleButtons();
      }
      if(this.best_hand(this.players_hand)==21) {
          this.toggleButtons();
      }
  }
    
    message(message) {
      var m = document.getElementById('message');
      m.innerHTML = message
    }
    
   

    aces(hand) {
      let count_of_aces = 0;
      for (let card of hand) {
        if (card.face=="A") {
          count_of_aces += 1;
        }
      }
      return (count_of_aces > 0)
    }


    evaluate_hand(hand) {
     
      let total = 0
      let results = []
      for (let card of hand) {
        total += card.value
      }
      results.push(total);
      if (this.aces(hand)) {
        results.push(total+10)
      }
      return results
    }    


    best_hand(hand) {
      let best = -1;
      let hands = this.evaluate_hand(hand)
      for (let hand of hands) {
        if (hand> best && hand < 22) {
          best = hand
        }
      }
      return best;
    }

    toggleButtons() {
      var b = document.getElementsByTagName("button")
            b[0].classList.toggle('hidden');
            b[1].classList.toggle('hidden');
            b[2].classList.toggle('hidden');
    }

    whoWon() {
      if(this.best_hand(this.dealers_hand) < this.best_hand(this.players_hand)) {
        this.message("Player Wins");
        console.log('Player Wins');
    }
    else if(this.best_hand(this.dealers_hand) > this.best_hand(this.players_hand)) {
        this.message("Dealer Wins");
        console.log('Dealer Wins');
    } else {
        this.message("Push");
        console.log('Push');
    }
    this.toggleButtons();
    }

    dealersTurn() {
      var p = document.getElementById('dealers_cards')
      p.innerHTML +=this.html_card(this.dealers_hand[1]);
      while (this.not_bust(this.players_hand) && (this.not_bust(this.dealers_hand))) { 
          if(this.has_blackjack(this.dealers_hand)) {
              this.message('Dealer has Blackjack');
              console.log("Blackjack!")
              break;
          }
          if(this.best_hand(this.dealers_hand)<17) {
              this.hitDealer();
              console.log(`Dealer's Hand: ${this.best_hand(this.dealers_hand, "player")}`);
          }
          if(this.is_bust(this.dealers_hand)) {
              this.message('Dealer Busts. You Win!');
              console.log('Dealer Busts.  You Win!');
              this.toggleButtons();
          } else if(this.best_hand(this.dealers_hand)>=17) {
              this.message(`Dealer Stands on ${this.best_hand(this.dealers_hand)}`);
              console.log(`Dealer Stands on ${this.best_hand(this.dealers_hand)}`);
              this.whoWon();                
              break;
          } else {
          }

      }
  }

  }

  function start() {
    game = new Blackjack()
    game.play()
  }



