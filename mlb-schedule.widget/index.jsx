import { React } from "uebersicht";

export const css = ``;

// ============================================================
//  CHANGE THIS TO YOUR TEAM
//  108 Angels     109 D-backs    110 Orioles    111 Red Sox
//  112 Cubs       113 Reds       114 Guardians  115 Rockies
//  116 Tigers     117 Astros     118 Royals     119 Dodgers
//  120 Nationals  121 Mets       133 Athletics  134 Pirates
//  135 Padres     136 Mariners   137 Giants     138 Cardinals
//  139 Rays       140 Rangers    141 Blue Jays  142 Twins
//  143 Phillies   144 Braves     145 White Sox  146 Marlins
//  147 Yankees    158 Brewers
// ============================================================
const TEAM_ID = 141;
const POSITION = { bottom: "90px", left: "20px" };

const TEAMS = {
  108:{abbr:"LAA",city:"Los Angeles",name:"Angels",      color:"#BA0021"},
  109:{abbr:"ARI",city:"Arizona",   name:"D-backs",      color:"#A71930"},
  110:{abbr:"BAL",city:"Baltimore", name:"Orioles",      color:"#DF4601"},
  111:{abbr:"BOS",city:"Boston",    name:"Red Sox",      color:"#BD3039"},
  112:{abbr:"CHC",city:"Chicago",   name:"Cubs",         color:"#0E3386"},
  113:{abbr:"CIN",city:"Cincinnati",name:"Reds",         color:"#C6011F"},
  114:{abbr:"CLE",city:"Cleveland", name:"Guardians",    color:"#00385D"},
  115:{abbr:"COL",city:"Colorado",  name:"Rockies",      color:"#33006F"},
  116:{abbr:"DET",city:"Detroit",   name:"Tigers",       color:"#0C2340"},
  117:{abbr:"HOU",city:"Houston",   name:"Astros",       color:"#002D62"},
  118:{abbr:"KC", city:"Kansas City",name:"Royals",      color:"#004687"},
  119:{abbr:"LAD",city:"Los Angeles",name:"Dodgers",     color:"#005A9C"},
  120:{abbr:"WSH",city:"Washington",name:"Nationals",    color:"#AB0003"},
  121:{abbr:"NYM",city:"New York",  name:"Mets",         color:"#002D72"},
  133:{abbr:"ATH",city:"Oakland",   name:"Athletics",    color:"#003831"},
  134:{abbr:"PIT",city:"Pittsburgh",name:"Pirates",      color:"#27251F"},
  135:{abbr:"SD", city:"San Diego", name:"Padres",       color:"#2F241D"},
  136:{abbr:"SEA",city:"Seattle",   name:"Mariners",     color:"#0C2C56"},
  137:{abbr:"SF", city:"San Francisco",name:"Giants",    color:"#FD5A1E"},
  138:{abbr:"STL",city:"St. Louis", name:"Cardinals",    color:"#C41E3A"},
  139:{abbr:"TB", city:"Tampa Bay", name:"Rays",         color:"#092C5C"},
  140:{abbr:"TEX",city:"Texas",     name:"Rangers",      color:"#003278"},
  141:{abbr:"TOR",city:"Toronto",   name:"Blue Jays",    color:"#134A8E"},
  142:{abbr:"MIN",city:"Minnesota", name:"Twins",        color:"#002B5C"},
  143:{abbr:"PHI",city:"Philadelphia",name:"Phillies",   color:"#E81828"},
  144:{abbr:"ATL",city:"Atlanta",   name:"Braves",       color:"#CE1141"},
  145:{abbr:"CWS",city:"Chicago",   name:"White Sox",    color:"#27251F"},
  146:{abbr:"MIA",city:"Miami",     name:"Marlins",      color:"#00A3E0"},
  147:{abbr:"NYY",city:"New York",  name:"Yankees",      color:"#003087"},
  158:{abbr:"MIL",city:"Milwaukee", name:"Brewers",      color:"#12284B"},
};

const SHORT_NAMES = {
  108:"Angels",109:"D-backs",110:"Orioles",111:"Red Sox",
  112:"Cubs",113:"Reds",114:"Guardians",115:"Rockies",
  116:"Tigers",117:"Astros",118:"Royals",119:"Dodgers",
  120:"Nationals",121:"Mets",133:"Athletics",134:"Pirates",
  135:"Padres",136:"Mariners",137:"Giants",138:"Cardinals",
  139:"Rays",140:"Rangers",141:"Blue Jays",142:"Twins",
  143:"Phillies",144:"Braves",145:"White Sox",146:"Marlins",
  147:"Yankees",158:"Brewers"
};

const team = TEAMS[TEAM_ID] || {abbr:"MLB",city:"My",name:"Team",color:"#333"};

export const refreshFrequency = 1000 * 60 * 1;

export const command = `
  TODAY=$(TZ="America/Toronto" date +%Y-%m-%d)
  SEASON_END="2026-09-27"
  STANDINGS=$(curl -s "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=2026&standingsTypes=regularSeason" 2>/dev/null)
  SCORE=$(curl -s "https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${TEAM_ID}&date=$TODAY&hydrate=linescore" 2>/dev/null)
  SCHEDULE=$(curl -s "https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${TEAM_ID}&season=2026&gameType=R&startDate=$TODAY&endDate=$SEASON_END" 2>/dev/null)
  echo "STANDINGS:$STANDINGS|||SCORE:$SCORE|||SCHEDULE:$SCHEDULE"
`;

export const className = `
  position: fixed;
  bottom: ${POSITION.bottom || "auto"};
  top: ${POSITION.top || "auto"};
  left: ${POSITION.left || "auto"};
  right: ${POSITION.right || "auto"};
  width: 272px;
  font-family: "Helvetica Neue", sans-serif;
  color: #ffffff;
  user-select: none;
  -webkit-user-select: none;
`;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function toET(dateStr) {
  const d = new Date(dateStr);
  const m = d.getUTCMonth();
  const isDST = m >= 2 && m <= 10;
  return new Date(d.getTime() + (isDST ? -4 : -5) * 3600000);
}

function fmtDate(dateStr) {
  const d = toET(dateStr);
  return MONTHS[d.getUTCMonth()] + " " + d.getUTCDate();
}

function fmtDay(dateStr) {
  return DAYS[toET(dateStr).getUTCDay()];
}

function fmtTime(dateStr) {
  const d = toET(dateStr);
  let h = d.getUTCHours(), m = d.getUTCMinutes();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return h + ":" + String(m).padStart(2,"0") + " " + ap;
}

function countdown(dateStr) {
  const diff = new Date(dateStr) - new Date();
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h >= 48) return "in " + Math.floor(h/24) + "d";
  if (h > 0) return "in " + h + "h " + m + "m";
  return "in " + m + "m";
}

function ordinal(n) {
  return n==="1"?"1st":n==="2"?"2nd":n==="3"?"3rd":n+"th";
}

function getDivName(id) {
  return {200:"AL West",201:"AL East",202:"AL Central",203:"NL West",204:"NL East",205:"NL Central"}[id]||"";
}

function getOppName(team) {
  return SHORT_NAMES[team.id] || team.teamName || team.name || "Opponent";
}

export const render = ({ output }) => {
  let wins="–", losses="–", gb="", divRank="", divName="", streak="";
  let liveScore = null;
  let upcomingGames = [];

  try {
    const p1 = (output||"").split("|||SCORE:");
    const standingsPart = (p1[0]||"").replace("STANDINGS:","");
    const rest = p1[1]||"";
    const p2 = rest.split("|||SCHEDULE:");
    const scorePart = p2[0]||"";
    const schedulePart = p2[1]||"";

    // Standings + streak
    if (standingsPart) {
      const sd = JSON.parse(standingsPart);
      for (const rec of sd.records||[]) {
        for (const t of rec.teamRecords||[]) {
          if (t.team.id === TEAM_ID) {
            wins = t.wins; losses = t.losses;
            gb = t.gamesBack==="0"?"—":t.gamesBack;
            divRank = t.divisionRank;
            divName = getDivName(rec.division&&rec.division.id);
            if (t.streak) streak = t.streak.streakCode||"";
          }
        }
      }
    }

    // Today's live/final score
    if (scorePart) {
      const sd = JSON.parse(scorePart);
      const tg = (sd.dates||[])[0];
      if (tg && tg.games && tg.games.length > 0) {
        const game = tg.games[0];
        const status = game.status.abstractGameState||"";
        const detail = game.status.detailedState||"";
        const coded  = game.status.codedGameState||"";
        const home = game.teams.home, away = game.teams.away;
        const isHome = home.team.id === TEAM_ID;
        const my = isHome ? home : away;
        const opp = isHome ? away : home;
        const oppName = getOppName(opp.team);
        const ls = game.linescore||{};
        const myR = my.score!==undefined ? my.score : "–";
        const oppR = opp.score!==undefined ? opp.score : "–";
        const isLive  = status==="Live"  || detail.includes("Progress") || coded==="I";
        const isFinal = status==="Final" || detail.includes("Final")    || coded==="F" || coded==="O";

        if (isLive) {
          liveScore = { state:"live", label:(ls.inningHalf==="Top"?"▲":"▼")+(ls.currentInning||""), my:myR, opp:oppR, oppName, isHome };
        } else if (isFinal) {
          liveScore = { state:"final", label:"Final", my:myR, opp:oppR, oppName, won:myR>oppR, isHome };
        } else {
          liveScore = { state:"preview", label:fmtTime(game.gameDate), oppName, isHome, gameDate:game.gameDate };
        }
      }
    }

    // Full schedule
    if (schedulePart) {
      const sd = JSON.parse(schedulePart);
      const games = [];
      for (const date of sd.dates||[]) {
        for (const game of date.games||[]) {
          const home = game.teams.home, away = game.teams.away;
          const isHome = home.team.id === TEAM_ID;
          const my = isHome ? home : away;
          const opp = isHome ? away : home;
          const status  = game.status.abstractGameState||"";
          const detail  = game.status.detailedState||"";
          const coded   = game.status.codedGameState||"";
          const isFinal = status==="Final" || detail.includes("Final") || coded==="F" || coded==="O";
          const isLive  = status==="Live"  || detail.includes("Progress") || coded==="I";
          games.push({
            gameDate: game.gameDate,
            date: fmtDate(game.gameDate),
            day:  fmtDay(game.gameDate),
            time: fmtTime(game.gameDate),
            isHome,
            oppId: opp.team.id,
            oppName: getOppName(opp.team),
            isFinal, isLive,
            myScore: my.score,
            oppScore: opp.score,
            won: isFinal && my.score > opp.score,
          });
        }
      }
      upcomingGames = games.slice(0, 7);
    }
  } catch(e) {}

  // Series indicator: find runs of same opponent
  function getSeriesInfo(games, idx) {
    const opp = games[idx].oppId;
    const isHome = games[idx].isHome;
    let start = idx;
    while (start > 0 && games[start-1].oppId===opp && games[start-1].isHome===isHome) start--;
    let end = idx;
    while (end < games.length-1 && games[end+1].oppId===opp && games[end+1].isHome===isHome) end++;
    const total = end - start + 1;
    const num = idx - start + 1;
    return total > 1 ? "Gm " + num + " of " + total : "";
  }

  // Next game countdown
  const nextGame = upcomingGames.find(g => !g.isFinal);
  const countdownStr = nextGame ? countdown(nextGame.gameDate) : null;

  return (
    <div style={{background:"rgba(10,18,35,0.92)",borderRadius:"12px",padding:"14px",border:"1px solid rgba(255,255,255,0.08)"}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",paddingBottom:"10px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{width:"36px",height:"36px",borderRadius:"50%",background:team.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"10px",fontWeight:"600",color:"#fff"}}>{team.abbr}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:"14px",fontWeight:"600",color:"#fff",lineHeight:1.2,fontFamily:"Futura, sans-serif",letterSpacing:"0.03em"}}>{team.city} {team.name}</div>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",marginTop:"1px"}}>
            2026 · {streak ? <span style={{fontWeight:"600",color:streak.startsWith("W")?"#7EC86A":"#F07070"}}>{streak}</span> : null}
            {countdownStr ? <span style={{color:"rgba(255,255,255,0.35)"}}> · Next {countdownStr}</span> : null}
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{display:"flex",alignItems:"baseline",gap:"3px",justifyContent:"flex-end"}}>
            <span style={{fontSize:"10px",color:"rgba(255,255,255,0.4)"}}>W</span>
            <span style={{fontSize:"18px",fontWeight:"600",color:"#7EC86A",fontFamily:"Futura, sans-serif"}}>{wins}</span>
            <span style={{fontSize:"15px",color:"rgba(255,255,255,0.3)",fontFamily:"Futura, sans-serif"}}>–</span>
            <span style={{fontSize:"18px",fontWeight:"600",color:"#F07070",fontFamily:"Futura, sans-serif"}}>{losses}</span>
            <span style={{fontSize:"10px",color:"rgba(255,255,255,0.4)"}}>L</span>
          </div>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)"}}>{divRank?ordinal(divRank)+" "+divName:divName}{gb?" · "+gb+" GB":""}</div>
        </div>
      </div>

      {/* Score banner */}
      {liveScore && (
        <div style={{marginBottom:"10px",padding:"8px 10px",borderRadius:"8px",background:liveScore.state==="live"?team.color+"55":liveScore.state==="final"&&liveScore.won?"rgba(60,120,40,0.35)":"rgba(140,30,30,0.4)",border:liveScore.state==="live"?"1px solid "+team.color:"1px solid rgba(255,255,255,0.1)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:"12px",fontWeight:"500",color:"#fff"}}>{liveScore.isHome?"vs":"@"} {liveScore.oppName}</div>
              {liveScore.state==="live" && <div style={{fontSize:"9px",color:"#FFD966",marginTop:"2px",display:"flex",alignItems:"center",gap:"4px"}}><span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#FFD966",display:"inline-block"}}></span>LIVE</div>}
            </div>
            <div style={{textAlign:"right"}}>
              {liveScore.state==="preview" ? (
                <div style={{fontSize:"13px",fontWeight:"600",color:"#fff"}}>{liveScore.label}</div>
              ) : (
                <div>
                  <div style={{fontSize:"20px",fontWeight:"600",color:liveScore.won?"#7EC86A":liveScore.state==="final"?"#F07070":"#fff",fontFamily:"Futura, sans-serif",letterSpacing:"0.02em"}}>{liveScore.my}–{liveScore.opp}</div>
                  <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)"}}>{liveScore.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schedule */}
      {upcomingGames.length > 0 ? upcomingGames.map((g, i) => {
        const isToday = !g.isFinal && !g.isLive && liveScore && liveScore.state==="preview";
        const series = getSeriesInfo(upcomingGames, i);
        let right = null;
        if (g.isFinal) {
          right = <span style={{fontSize:"10px",fontWeight:"600",padding:"1px 5px",borderRadius:"3px",background:g.won?"rgba(60,120,40,0.4)":"rgba(180,40,40,0.3)",color:g.won?"#7EC86A":"#F07070",flexShrink:0}}>{g.won?"W":"L"} {g.myScore}–{g.oppScore}</span>;
        } else if (g.isLive) {
          right = <span style={{fontSize:"10px",fontWeight:"600",padding:"1px 5px",borderRadius:"3px",background:"rgba(255,200,50,0.2)",color:"#FFD966",flexShrink:0}}>LIVE</span>;
        } else {
          right = <span style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",flexShrink:0,whiteSpace:"nowrap"}}>{g.time}</span>;
        }

        return (
          <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",padding:"4px 6px",borderRadius:"6px",marginBottom:"1px",background:isToday?team.color+"33":"transparent",border:isToday?"1px solid "+team.color+"66":"1px solid transparent"}}>
            <div style={{minWidth:"44px",flexShrink:0}}>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.45)"}}>{g.date}</div>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,0.25)"}}>{g.day}{series?" · "+series:""}</div>
            </div>
            <span style={{fontSize:"9px",fontWeight:"600",padding:"1px 4px",borderRadius:"3px",background:g.isHome?team.color+"88":"rgba(255,255,255,0.08)",color:g.isHome?"#fff":"rgba(255,255,255,0.35)",flexShrink:0,minWidth:"30px",textAlign:"center"}}>{g.isHome?"HOME":"AWAY"}</span>
            <span style={{flex:1,fontSize:"12px",color:g.isFinal?"rgba(255,255,255,0.5)":"#fff",fontWeight:"500",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{g.oppName}</span>
            {right}
          </div>
        );
      }) : <div style={{fontSize:"11px",color:"rgba(255,255,255,0.3)",textAlign:"center",padding:"12px 0"}}>Loading schedule...</div>}

      <div style={{fontSize:"10px",color:"rgba(255,255,255,0.2)",textAlign:"right",marginTop:"8px",paddingTop:"6px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>mlb.com</div>
    </div>
  );
};
