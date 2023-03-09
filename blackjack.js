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
        
    }
}

console.log("I am loaded.")

let d = new Deck()