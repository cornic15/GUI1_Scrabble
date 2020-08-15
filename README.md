# GUI1_Scrabble
This is a scrabble game for an assignment for my GUI class. I created a one line scrabble board. The user is able to drag and drop tiles from their hand to the board. The user must start at the left most tile. The titles stick once placed down. The tiles need to be placed next to each other so there is no gap. If the tiles is placed in an incorrect position then the tile will bounce back. Words are verified with a 3,000 word dictionary. There are two double word score tiles that are functional. The program can handle multiple words and will add them to the score. 
(4) letter tiles in the player’s “hand” are selected randomly from a data structure with the
proper distribution of the letters
Yes, letters are randomly selected, and letters have a weight to them
• (4) letter tiles can be dragged-and-dropped onto target Scrabble squares
Yes, they can only go to game board squares
• (4) program identifies which letter tile is dropped onto which Scrabble square
Yes, the program can differentiate between different tiles and different scores as well as the blank tile
• (4) board includes bonus squares
Board has two double word squares
• (4) score is tallied correctly, including consideration of bonus square multipliers Yes, scored is doubled if tile is on double word
• (3) any number of words can be played until the player wishes to quit or depletes all tiles
There is a restart game button 
• (3) the board is cleared after each round so that a new word can be played
Yes the board is cleared on submit word 
• (3) after playing a word, only the number of letter tiles needed to bring the player’s “hand”
back to 7 tiles are selected
Yes, if a user makes a three letter word then three tiles are randomly chosen to fulfill the hand
• (3) score is kept for multiple words
Yes, score is kept for multiple words 
• (2) Tiles can only be dragged from the “rack” to Scrabble board. If the user drop them
anywhere else, they will be bounced back to the “rack”.
Yes, they bounce back if in wrong location
• (2) Once the tile is placed on the Scrabble board, it can not be removed.
Yes, title can’t be removed once placed
• (2) Except for the first letter, all sub-subsequent letters must be placed directly next to or
above/below another letter with no space. Else, they will bounce back to the “rack”. 
First letter needs to be place in the leftmost title then all letters need too to be next to another letter, so no spaces or else they bounce back to the rack. 
(3 point) Full Scrabble board lines are implemented
N/A
• (2 points) Validating to see if a word that the user enters is valid (from /usr/share/dict/words)
Yes, used a word list with 3,000 common English words 
