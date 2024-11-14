# MathBoxClient
 the client-side for the MathBox game

Completed:
- Main Menu for the game (template)
- Added the ability to host games by making a new room on the server that the client then joins.
- Made it so that the server keeps track of who hosts each room and tells the player if they are the host of the room
- Rooms that do not exist (checked via socket.io call) will not show up on the client side and will instead who as errors. Loading screen added in case the socket call takes a while to render.
- Made it so that if the host refreshes, then the room is deleted.