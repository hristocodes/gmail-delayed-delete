A simple script to delete tagged email later
============================================

tl;dr
-----
Helps you get rid of emails you don't need to keep, but might want to give a second look in the near future.

More
----
Designed to make it easier to delete emails that fit somewhere between *"This one's a keeper!"* and *"That one goes to Trash right away"*.  
Set-up your label(s), e.g. `auto delete\in a month` and `auto delete\in a year`, and have the script delete the tagged messages at the end of the period. End up with less clutter in your mail so it's easier to find important messages.  
It's similar to how the "Trash" label works in Gmail (messages stay there for 30 days before getting deleted) but works with any period you like. Also, works the same way as manual deletion - moves the messages to "Trash".

How-to
------
1. Install the script. Start [here](http://www.google.com/script/start/ "Google Apps Script").
2. Set-up your labels in `initLabels_()`. Have each period (in days) match its label. *Note: Gmail sorts the labels alphabetically.*
3. Run `createGmailLabels()` and the labels should appear in your Gmail. To change them, run `deleteGmailLabels()` and go a step back.
4. Set `trashExpiredThreads()` to run scheduled every night.
