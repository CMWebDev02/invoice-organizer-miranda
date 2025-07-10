# invoice-organizer-miranda
Front end web project that provides a way to sort and mange invoice files that are stored in a file system of a server.

** Utilize my invoice-sort-api in tandem with this project **
The api acts as a backend to the filesystem to allow relocating and sorting files into their appropriate directories.


## Organizers
To better sort files within directories, this project display a file containing a name identifier that denotes which directory the file needs to be sorted to.
Something like a company name or a customer name would suffice.

A list of all directories is also display along with the file, and from this list you can select the directory the file should be sorted too.
The list itself allows filtered to more easily find the appropriate directory you are searching for.

The file is also stored within a year folder to help with searching for invoices later on.
By separating by year, it makes it far easier to manage multiple invoices within a directory.

Every time a file is sorted, a request to the backend is made to fetch the next file or invoice to be sorted to allow for a seamless sorting experience
without having to jump through multiple directories or move across multiple windows.

## Changelog
Every action performed is stored in a changelog, each organizer houses their own changelog to make it easier to manage which action occurred within specific directories.
Most changelog entries can be "undone" by clicking the undo button position next to them, if enabled in the settings you can also do this from the quick view changelog as well.+
All undo actions will be added to the changelog as well to signal if the action was successfully undone or if an error occurred.

## Settings
Various settings can be altered within the settings page that will affect the whole project.
Some of the main settings are toggling certain quick interaction buttons and changing the amount of changelog entries displayed or stored.

## User Accounts
New users are required to register an account before gaining access to the project, and all user accounts are stored and accessed using the same backend server for sorting the files.

## Hotkeys
There are many hotkeys available to make using the keyboard only possible.
** To avoid most conflicts, all major hotkeys for this project utilize a combination of keys, all hotkeys activate by pressing the control and shift key along with the main key! **

### Invoice Organizer Pages
- Control + Shift + Enter - Sorts current file.
- Control + Shift + U - Opens create new directory interface.
- Control + Shift + F - Selects and highlights all text in the directory filter textbox**
- Control + Shift + Y - Selects and highlights all text in the year selector textbox**
- 1, 2, 3, 4, 5, 6, 7, 8, 9 - Each number key auto selects the associate entry in the directory list***

** When any text box is focused by the user, pressing the escape key will remove focus from the textbox.
*** The first nine directory options will have numbers denoting which number key they are associated with.

### Create New Directory Interface
- Control + Shift + U - Closes the create new directory interface.
- Control + Shift + Enter - Creates a new directory.**

** This overwrites the similar hotkey for the main organizer page while the create new directory interface is open.
