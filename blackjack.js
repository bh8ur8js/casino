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
  // def __init__(self):
  // self.deck  = Deck()
  // self.set_card_values()
  // self.players_score = 0
  // self.dealers_score = 0
  // self.players_hand = []
  // self.dealers_hand = []  
    constructor() { 
        this.deck  = new Deck()
        this.set_card_values()
        this.players_score = 0
        this.dealers_score = 0
        this.players_hand = []
        this.dealers_hand = []  
    }

    // def set_card_values(self):
    // for card in self.deck.cards:
    //     match card["face"]:
    //         case 'A': 
    //             value = 1
    //         case 'K':
    //             value = 10
    //         case 'Q':
    //             value = 10
    //         case 'J': 
    //             value = 10
    //         case _: 
    //             value = card["face"]
    //     card["value"] = value
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

    hitPlayer() {
     this.hit(this.players_hand);
     var p = document.getElementById("dealers_cards")
     p.innerHTML += this.html_card(this.players_hand[this.players_hand.length-1])
    }

    play() {
      console.log('reset table');
      this.reset_table();
      console.log('deal hand');
      console.log('display deal');      
      console.log('check player');
    }

    reset_table() {
      var d = document.getElementById('players_cards')
      var p = document.getElementById('dealers_cards');
      p.innerHTML = "";
      d.innerHTML = "";
    }

  }

  function start() {
    game = new Blackjack()
    game.play()
  }



