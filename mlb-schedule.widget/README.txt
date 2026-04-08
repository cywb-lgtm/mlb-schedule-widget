================================================
  MLB Schedule Widget for Übersicht
  Created by Chantel Whitter, 2026
================================================

A live MLB desktop widget for Mac that shows your
team's schedule, live score, standings, streak,
series info, and next game countdown — all in one
clean panel on your wallpaper.

------------------------------------------------
REQUIREMENTS
------------------------------------------------
- Mac (macOS 10.15 or later)
- Übersicht (free): https://tracesof.net/uebersicht/
- Internet connection (for live data)

------------------------------------------------
INSTALLATION
------------------------------------------------
1. Download and install Übersicht
2. Click the Übersicht menu bar icon (looks like <> )
3. Select "Open Widgets Folder"
4. Drag the entire "mlb-schedule.widget" folder
   into your widgets folder
5. The widget will appear on your desktop automatically

------------------------------------------------
CHANGING YOUR TEAM
------------------------------------------------
1. Open "mlb-schedule.widget" folder
2. Right-click "index.jsx" → Open With → TextEdit
3. Find this line near the top:

     const TEAM_ID = 141;

4. Replace 141 with your team's ID from this list:

   108 Angels      109 D-backs     110 Orioles
   111 Red Sox     112 Cubs        113 Reds
   114 Guardians   115 Rockies     116 Tigers
   117 Astros      118 Royals      119 Dodgers
   120 Nationals   121 Mets        133 Athletics
   134 Pirates     135 Padres      136 Mariners
   137 Giants      138 Cardinals   139 Rays
   140 Rangers     141 Blue Jays   142 Twins
   143 Phillies    144 Braves      145 White Sox
   146 Marlins     147 Yankees     158 Brewers

5. Save the file — widget updates automatically!

------------------------------------------------
MOVING THE WIDGET
------------------------------------------------
In index.jsx, find this line:

  const POSITION = { bottom: "110px", left: "20px" };

Change the values to move it anywhere on screen.
Use top/bottom and left/right (in pixels).

Examples:
  Top right:    { top: "20px", right: "20px" }
  Bottom left:  { bottom: "110px", left: "20px" }
  Top left:     { top: "20px", left: "20px" }

------------------------------------------------
FEATURES
------------------------------------------------
- Live score with inning tracker
- Win/Loss record with streak (W3, L6, etc.)
- Division rank and games back
- Countdown to next game
- Series indicator (Gm 1 of 3, etc.)
- Full schedule pulled from MLB Stats API
- Accurate ET game times
- Auto-updates every minute
- Works for all 30 MLB teams
- Team colour theming

------------------------------------------------
LICENSE
------------------------------------------------
Free for personal use. See LICENSE.txt for details.
© 2026 Chantel Whitter — CC BY-NC 4.0
Do not sell or redistribute for profit.

------------------------------------------------
CREDITS
------------------------------------------------
- MLB data provided by MLB Stats API (statsapi.mlb.com)
- Built for Übersicht by Felix Hageloh
- MLB trademarks property of Major League Baseball
================================================
