// City-specific Decision Fit Mapping for combo pages (the May 2026 SOP's #1 factor).
// Keyed by [citySlug][useCaseKey] -> HTML string. When present, ComboPage uses this
// instead of the generic city-threaded useCase.decisionFit(), pushing each combo well
// past the 85% uniqueness bar by referencing that city's real permits/venues/weather.
//
// Coverage: live-GBP cities first (Chicago, Denver, Long Beach, New York).
// Staged cities (Doral, Los Angeles, North Miami, Plano) fall back to the generic
// decision-fit until their batch is written.

const COMBO_DECISION_FIT = {
  'porta-potties-chicago': {
    construction: `<h2>Which Construction Unit Fits Your Chicago Site?</h2>
      <hr class="gold-rule" />
      <p>Sizing this in Chicago really comes down to two things: where the site is and what month it is. If you are running a ground-level build in Pilsen or the South Side with a crew under 10, choose the standard unit on a 28-day cycle &mdash; cheapest path that still gets weekly service. If you are stacking floors in Fulton Market or the West Loop, the narrow-profile hoisted unit is the only thing that reaches upper floors by crane-lift; a standard unit simply will not go up.</p>
      <p>And if any part of your job runs December through March, choose winterization without thinking twice. Chicago averages 38 days below freezing and the 2019 polar vortex held the city under 20&deg;F for five straight days &mdash; cold enough to crack a holding tank. The trade-off is about +$45 a cycle against buying a unit you cracked. Easy math.</p>`,
    event: `<h2>How Many Units Does Your Chicago Event Really Need?</h2>
      <hr class="gold-rule" />
      <p>Start with the matrix below, then adjust for the Chicago realities. If your event sits inside Grant Park, Millennium Park, or the Soldier Field perimeter, choose to plan early &mdash; those need Chicago Park District permits with their own lead times, separate from the CDOT public-way review. If you are serving alcohol at a Fulton Market block party or a neighborhood festival, choose to add 20% more units; the line forms fast once the bar opens.</p>
      <p>One Chicago-specific note: the city requires a five-foot accessible pedestrian path around any obstruction, so placement is not just about count &mdash; it is about where the units sit on the public way.</p>`,
    wedding: `<h2>Trailer or Standard Units for Your Chicago Wedding?</h2>
      <hr class="gold-rule" />
      <p>Depends on the venue and the season. For a lakefront or Park District ceremony under about 100 guests, flushable single units with interior sinks are clean and presentable and keep the budget sane. Over 100, or an upscale West Loop loft wedding, choose the two-stall restroom trailer &mdash; running water, climate control, real lighting. In a Chicago context that climate control is not a luxury: a July lakefront reception and an October garden ceremony are two completely different comfort problems, and the trailer solves both.</p>`,
    ada: `<h2>How Many ADA Units Does Your Chicago Event Need?</h2>
      <hr class="gold-rule" />
      <p>Plan one ADA-accessible unit for any permitted Chicago event, then add one per ten standard units. The placement detail that trips people up here is the city's five-foot accessible-path rule &mdash; an ADA unit shoved into a far corner of Grant Park technically is not accessible, and the Park District or CDOT reviewer will say so. Choose firm, level ground near the main path of travel, and for larger lakefront events distribute the ADA units rather than clustering them.</p>`,
    handwash: `<h2>How Many Handwash Stations for Your Chicago Setup?</h2>
      <hr class="gold-rule" />
      <p>Baseline is one handwash station per two restroom units. If your Chicago event has food vendors &mdash; and a Pilsen festival or a Grant Park event almost always does &mdash; choose to add dedicated stations near the food. The Chicago Department of Public Health expects accessible handwashing at any event serving food, and "they can use the restroom sink" is how you fail that check. On a straightforward construction site, one station at the unit cluster keeps you compliant.</p>`,
    longterm: `<h2>Which Long-Term Plan Fits Your Chicago Site?</h2>
      <hr class="gold-rule" />
      <p>Chicago issued over 23,000 building permits in 2024, and the long-haul tower work in Fulton Market and the West Loop is exactly what a managed plan is built for. If you have a steady small crew, choose the standard 28-day cycle with weekly service. If headcount swings, choose twice-weekly. The non-negotiable for any Chicago project crossing into winter: fold winterization into the plan up front &mdash; anti-freeze tank treatment and insulated shells &mdash; rather than scrambling when the first polar-vortex week hits.</p>`,
    film: `<h2>What Does Your Chicago Base Camp Actually Need?</h2>
      <hr class="gold-rule" />
      <p>Chicago is a real production town &mdash; Chicago Fire, PD, and Med, The Bear, and Power Book IV all run base camps here, around Cinespace and on neighborhood locations. Match the unit to the day. A lean day shoot can run standard event-grade units at base camp. A multi-day shoot with talent and department heads on site needs the climate-controlled trailer; a Chicago winter exterior day makes that call for you. Whatever the size, choose a vendor that dispatches seven days a week, because location days here do not wait for business hours.</p>`,
  },

  'porta-potties-denver': {
    construction: `<h2>Which Construction Unit Fits Your Denver Site?</h2>
      <hr class="gold-rule" />
      <p>Two things drive this on the Front Range: the 2026 drought and the freeze-thaw. With Denver Water under Stage 1 restrictions, if you are pulling city water for flush units, choose waterless instead &mdash; it sidesteps the mandated cutbacks entirely, and we can convert an active flush rotation to waterless within 48 hours. If your RiNo or infill site runs through winter, choose winterization; Denver sees roughly 120 freeze-thaw cycles a year and 40-degree single-day swings that seize latches and crack waste lines on units not built for altitude.</p>
      <p>The trade-off is small &mdash; an anti-freeze, insulated unit costs a little more per cycle than a basic one. At 5,280 feet, with UV degrading plastic 15&ndash;20% faster than sea level, the cheap unit is a false economy.</p>`,
    event: `<h2>How Many Units Does Your Denver Event Really Need?</h2>
      <hr class="gold-rule" />
      <p>Use the matrix, then think about water and elevation. During Stage 1 drought, choose waterless event units where you can &mdash; it is the responsible call and it dodges the watering restrictions. If your event is up a foothills grade toward Morrison or Evergreen, choose to confirm access early; those are narrow mountain roads, not a flat city drop. Serving alcohol at a RiNo lot party? Add 20% to the count, same as anywhere.</p>`,
    wedding: `<h2>Trailer or Standard Units for Your Denver Wedding?</h2>
      <hr class="gold-rule" />
      <p>Front Range weddings live and die on the venue access. For a flat metro venue under about 100 guests, flushable single units are plenty. For a Red Rocks-area or Morrison foothills ceremony, choose the mountain-access restroom trailer rated for the grades and switchbacks on CO-8 and CO-74 &mdash; at 6,450 feet, you do not want a trailer that cannot make the climb. Climate control matters here too: an afternoon at altitude can swing from sunburn to a cold wind in an hour, and a comfortable trailer keeps guests at the reception.</p>`,
    ada: `<h2>How Many ADA Units Does Your Denver Event Need?</h2>
      <hr class="gold-rule" />
      <p>One ADA unit for any permitted event, then one per ten standard units &mdash; the standard rule. The Denver wrinkle is terrain: a foothills or park venue on a slope makes "firm, level ground" harder than it sounds, and a tilted ADA unit fails both safety and compliance. Choose your placement first, level it properly, and keep it on the main accessible path rather than the easy-to-park corner.</p>`,
    handwash: `<h2>How Many Handwash Stations for Your Denver Setup?</h2>
      <hr class="gold-rule" />
      <p>One station per two units is the baseline. With Denver Water restrictions in force, choose our low-draw stations and pair them near food vendors at any event &mdash; Denver's health requirements still expect accessible handwashing even while everyone is conserving. On a drought-conscious construction site, a single station at the unit cluster covers compliance without adding to your metered water draw.</p>`,
    longterm: `<h2>Which Long-Term Plan Fits Your Denver Site?</h2>
      <hr class="gold-rule" />
      <p>The Denver-Aurora-Lakewood metro is over 8,300 square miles, so a long-term plan is really about routing and weather. If your site is steady, choose the 28-day cycle with weekly service. If you are drought-exposed, build the plan around waterless units so restrictions never stall you. And for any project crossing winter, choose to lock winterization in up front &mdash; anti-freeze disinfectant in the tanks, insulated shells for sustained sub-freezing nights. That is the Jobsite Reliability Plan, and it is the whole reason to go managed instead of ad hoc.</p>`,
    film: `<h2>What Does Your Denver Base Camp Actually Need?</h2>
      <hr class="gold-rule" />
      <p>Denver and the foothills draw steady location work, and base camp at altitude has its own quirks. For a lean day shoot, standard event-grade units are fine. For multi-day work or talent on site, choose the climate-controlled trailer &mdash; the high-altitude sun and fast temperature swings make crew comfort a scheduling issue, not a perk. If the location is up a mountain grade toward Morrison or Evergreen, confirm the trailer is rated for the climb before the call sheet locks.</p>`,
  },

  'porta-potties-long-beach': {
    construction: `<h2>Which Construction Unit Fits Your Long Beach Site?</h2>
      <hr class="gold-rule" />
      <p>Long Beach construction splits into port-adjacent industrial work and everything else. If your site is near the Port of Long Beach with trucks moving between the 710, the 405, and Willow Street, choose a service schedule planned around those traffic windows &mdash; a short delivery becomes a missed window fast if the route is not timed, and units have to stay clear of forklift lanes and gate access. For a standard remodel or school-adjacent job, the standard 28-day unit with weekly service is the straightforward call. Salt air is the quiet factor: coastal placement corrodes cheap hardware, so the unit you pick should be built for it.</p>`,
    event: `<h2>How Many Units Does Your Long Beach Event Really Need?</h2>
      <hr class="gold-rule" />
      <p>Use the matrix, then plan for the waterfront. If your event is at Shoreline Aquatic Park, Rainbow Lagoon, or Marine Stadium, choose presentation-ready units and account for wind exposure and guest flow &mdash; coastal layouts change both placement and service timing. Serving alcohol at a Belmont Shore gathering? Add 20%. And confirm the service truck can still reach the units once fencing, tents, and vendors are in place; on a tight waterfront site that is the detail that gets missed.</p>`,
    wedding: `<h2>Trailer or Standard Units for Your Long Beach Wedding?</h2>
      <hr class="gold-rule" />
      <p>For a smaller backyard or simple venue wedding under about 100 guests, flushable single units do the job. For a waterfront reception near Marine Stadium or a Belmont Shore venue, choose the restroom trailer &mdash; the ocean breeze is lovely until guests are in formalwear at a basic unit, and the trailer's running water and lighting hold up across a long coastal evening. Book early; in-season Saturdays on the water go first.</p>`,
    ada: `<h2>How Many ADA Units Does Your Long Beach Event Need?</h2>
      <hr class="gold-rule" />
      <p>One ADA unit for any permitted event, then one per ten standard units. Long Beach park events may need coordination with Parks, Recreation and Marine, and waterfront venues add a placement wrinkle &mdash; soft or uneven ground near the shore makes level, firm placement harder. Choose the spot on the main accessible path, level it, and keep it usable after the event buildout rather than letting tents and fencing box it in.</p>`,
    handwash: `<h2>How Many Handwash Stations for Your Long Beach Setup?</h2>
      <hr class="gold-rule" />
      <p>One station per two units to start. Long Beach has heavy demand from waterfront festivals, school athletics, and rowing and boating events &mdash; anywhere there are food vendors, choose to add dedicated stations near the food to satisfy the health requirement. On a port or industrial site, one station at the unit cluster keeps the crew compliant and clear of the equipment lanes.</p>`,
    longterm: `<h2>Which Long-Term Plan Fits Your Long Beach Site?</h2>
      <hr class="gold-rule" />
      <p>For port-support contractors and longer coastal builds, the plan is about reliable routing through real traffic. Choose the 28-day cycle with weekly service for a steady crew; step up the frequency for heavy port-adjacent use. The Long Beach-specific value is scheduling around the 710/405/Lakewood pressure and gate access so service never slips &mdash; on a months-long job near the port, one missed week is all it takes to lose the crew's confidence.</p>`,
    film: `<h2>What Does Your Long Beach Base Camp Actually Need?</h2>
      <hr class="gold-rule" />
      <p>Long Beach pulls steady production with its port, waterfront, and standing-in-for-anywhere streets. For a lean day shoot, standard event-grade units at base camp are fine. For multi-day or talent-facing work, choose the climate-controlled trailer &mdash; coastal sun and a long location day make crew comfort a schedule issue. Whatever the size, you want seven-day, off-hours dispatch, because a base-camp problem at a 5am call near the water is a real problem.</p>`,
  },

  'porta-potties-new-york': {
    construction: `<h2>Which Construction Unit Fits Your New York Site?</h2>
      <hr class="gold-rule" />
      <p>In New York the unit follows the access. If you are on a high-rise in Hudson Yards, the Penn Station zone, or Downtown Brooklyn, choose the narrow-profile unit sized for freight elevators and crane-hook lifting &mdash; a standard unit does not fit the hallway, let alone the hoist. For a ground-level site, the standard 28-day unit is the call. The cost nobody budgets for is the congestion toll: since January 2025 every service trip below 60th Street runs $9 at peak, so choose a provider that builds routing to minimize zone entries without stretching your weekly service. That routing discipline is the Palace Placement Promise, and on a FiDi or SoHo site it is real money.</p>`,
    event: `<h2>How Many Units Does Your New York Event Really Need?</h2>
      <hr class="gold-rule" />
      <p>Use the matrix, then plan the permit before the units. Anything on the public way runs through SAPO &mdash; a $25 application that loops in NYPD, FDNY, Sanitation, DOT, and the Community Board, and it can take weeks if you file late. For a sidewalk event, choose trailered, DOT-clearance-legal platforms and keep a five-foot pedestrian corridor or you trip the full sidewalk-closing permit. NYC Parks requires an ADA unit for any permitted event over 20 attendees, so build that in from the start.</p>`,
    wedding: `<h2>Trailer or Standard Units for Your New York Wedding?</h2>
      <hr class="gold-rule" />
      <p>For a rooftop or loft wedding where the only access is a freight elevator, unit dimensions decide everything &mdash; choose what physically fits the building first. For an outdoor or estate venue under about 100 guests, flushable single units are clean and presentable. Over 100 or anything upscale, choose the restroom trailer for running water, climate control, and lighting that matches the event. In a New York summer or a cold-snap fall, that climate control is what keeps guests inside the party.</p>`,
    ada: `<h2>How Many ADA Units Does Your New York Event Need?</h2>
      <hr class="gold-rule" />
      <p>NYC Parks requires at least one ADA-accessible unit for any permitted event over 20 attendees &mdash; this is explicit, not a judgment call &mdash; then add one per ten standard units. On a sidewalk or plaza site, choose placement that holds the five-foot pedestrian corridor and sits on firm, level ground with ground-level entry. Distribute units across a large venue like Flushing Meadows rather than clustering them so no guest has to cross the whole park.</p>`,
    handwash: `<h2>How Many Handwash Stations for Your New York Setup?</h2>
      <hr class="gold-rule" />
      <p>One station per two units as the baseline. For a street fair or block party with food vendors, choose dedicated stations near the food &mdash; the health code expects accessible handwashing, and a SAPO-permitted event with vendors gets looked at. On a high-rise construction site, a station at the unit cluster keeps the crew compliant; just remember it counts as another item on the freight-elevator and congestion-zone routing.</p>`,
    longterm: `<h2>Which Long-Term Plan Fits Your New York Site?</h2>
      <hr class="gold-rule" />
      <p>NYC logged $74 billion in building starts in 2025, and the standing high-rise rotations &mdash; Hudson Yards, the Penn redevelopment, the JFK terminal rebuild &mdash; are exactly what a managed plan handles. Choose the 28-day cycle with weekly service for a steady crew, more frequent for heavy use. The New York-specific math is the congestion zone: a managed plan schedules service trips to minimize $9 peak entries below 60th Street without stretching intervals, so reliability and cost both hold over a multi-month job.</p>`,
    film: `<h2>What Does Your New York Base Camp Actually Need?</h2>
      <hr class="gold-rule" />
      <p>NYC processed over 5,500 production permits in 2025, so location crews here know base camp. For a lean day shoot, standard units work. For multi-day shoots with talent and department heads, choose the climate-controlled trailer &mdash; on a five-borough location day, crew comfort keeps the schedule. Two New York realities to plan for: base camp often lands inside the congestion zone, so routing matters, and street placement may need the same SAPO and DOT clearances as any other public-way use.</p>`,
  },

  'porta-potties-doral': {
    construction: `<h2>Which Construction Unit Fits Your Doral Site?</h2>
      <hr class="gold-rule" />
      <p>Doral construction is mostly commercial &mdash; warehouse builds, tenant improvements, and contractor staging through the NW 87th Avenue corridor and the Medley/Hialeah industrial edge. For a standard commercial job, choose the 28-day unit with weekly service and place it with clear setbacks from work zones, dumpsters, and storm drains. The real Doral variable is access: trucks fighting the Palmetto, the Dolphin Expressway, and MIA-area traffic mean a service window can vanish, so choose a schedule planned around those routes rather than a generic drop-off. South Florida heat and humidity also push service frequency up &mdash; a unit bakes faster here than it does up north.</p>`,
    event: `<h2>How Many Units Does Your Doral Event Really Need?</h2>
      <hr class="gold-rule" />
      <p>Use the matrix, then plan for Doral's mix of corporate and community events. For a Downtown Doral corporate gathering or an office-park function, choose presentation-ready units and position them so guests find them easily without crossing the whole venue. Serving alcohol? Add 20%. In the South Florida heat, choose to add handwash stations and keep units shaded where you can &mdash; guest comfort drops fast in August humidity, and that shows up in the lines.</p>`,
    wedding: `<h2>Trailer or Standard Units for Your Doral Wedding?</h2>
      <hr class="gold-rule" />
      <p>For a smaller west Miami-Dade venue under about 100 guests, flushable single units with interior sinks do the job. For an upscale Doral reception, choose the climate-controlled restroom trailer &mdash; in South Florida heat, air conditioning in the restroom is the difference between guests staying and guests leaving early. Book early; in-season Saturdays go first, and storm-season backups make late bookings risky.</p>`,
    ada: `<h2>How Many ADA Units Does Your Doral Event Need?</h2>
      <hr class="gold-rule" />
      <p>One ADA unit for any permitted Doral event, then one per ten standard units. Place it on firm, level ground near the main accessible path &mdash; and in Doral, plan placement so the ADA route stays usable after fencing, tents, and vendor layouts go in. For a corporate or community event, distribute units rather than clustering them so accessibility is real, not just a checkbox.</p>`,
    handwash: `<h2>How Many Handwash Stations for Your Doral Setup?</h2>
      <hr class="gold-rule" />
      <p>One station per two units to start. Doral events with food vendors &mdash; community gatherings, office-park functions, school events &mdash; should choose dedicated stations near the food to meet Miami-Dade health expectations. On a warehouse or commercial site, one station at the unit cluster covers the crew. In the heat, handwashing access also just keeps a site civilized.</p>`,
    longterm: `<h2>Which Long-Term Plan Fits Your Doral Site?</h2>
      <hr class="gold-rule" />
      <p>For Doral's warehouse corridor and longer commercial rotations, the plan is about reliable service through real traffic. Choose the 28-day cycle with weekly service for a steady crew; step it up for heavy use or peak heat, when units need attention more often. The Doral-specific value is routing around MIA-area and Palmetto congestion so service never slips on a months-long job, plus storm-season responsiveness when a unit needs to be secured or swapped fast.</p>`,
    film: `<h2>What Does Your Doral Base Camp Actually Need?</h2>
      <hr class="gold-rule" />
      <p>Doral and west Miami-Dade pull commercial and production work alike. For a lean day shoot, standard event-grade units at base camp are fine. For multi-day or talent-facing work, choose the climate-controlled trailer &mdash; South Florida sun makes crew comfort a scheduling issue, not a perk. Whatever the size, you want seven-day, off-hours dispatch and placement that survives the airport-area traffic windows.</p>`,
  },

  'porta-potties-los-angeles': {
    construction: `<h2>Which Construction Unit Fits Your Los Angeles Site?</h2>
      <hr class="gold-rule" />
      <p>Los Angeles jobs change block by block, so placement matters as much as the unit. For a dense East LA or Boyle Heights site where curb access tightens by noon, choose a delivery and service schedule timed around the 5, 10, 60, and 710 corridors &mdash; a site that is easy at 9am can be boxed in by parked vehicles and freeway spillover by midday. For a Commerce or Vernon industrial job, the standard 28-day unit with weekly service is straightforward; just keep clear setbacks from work zones and storm drains.</p>`,
    event: `<h2>How Many Units Does Your Los Angeles Event Really Need?</h2>
      <hr class="gold-rule" />
      <p>Use the matrix, then plan for LA access. For an outdoor market, community event, or school function around East LA or Monterey Park, choose units placed close enough for guests to find but clear of food and seating, and confirm the service truck can still reach them after fencing and tents go up. Serving alcohol? Add 20%. In LA heat, shade and handwash access keep the lines from turning ugly.</p>`,
    wedding: `<h2>Trailer or Standard Units for Your Los Angeles Wedding?</h2>
      <hr class="gold-rule" />
      <p>For a smaller backyard or simple venue wedding under about 100 guests, flushable single units are plenty. For an upscale LA venue or a production-grade event, choose the restroom trailer &mdash; running water, climate control, and lighting that matches the day. In the Southern California heat, that climate control keeps guests at the reception instead of hiding in the AC of their cars. Book early; in-season dates move fast.</p>`,
    ada: `<h2>How Many ADA Units Does Your Los Angeles Event Need?</h2>
      <hr class="gold-rule" />
      <p>One ADA unit for any permitted LA event, then one per ten standard units. On a tight East LA or downtown site, the placement challenge is keeping the accessible path open after the buildout &mdash; choose firm, level ground on the main route and protect it from fencing and vendor creep. For larger venues, distribute units so no guest has to cross the whole site.</p>`,
    handwash: `<h2>How Many Handwash Stations for Your Los Angeles Setup?</h2>
      <hr class="gold-rule" />
      <p>One station per two units as the baseline. LA events with food vendors &mdash; markets, festivals, school functions &mdash; should choose dedicated stations near the food to meet county health requirements. On a construction site in Commerce or Vernon, one station at the unit cluster keeps the crew compliant and out of the equipment lanes.</p>`,
    longterm: `<h2>Which Long-Term Plan Fits Your Los Angeles Site?</h2>
      <hr class="gold-rule" />
      <p>For LA's commercial builds and contractor rotations, a long-term plan is about routing through traffic that never really lets up. Choose the 28-day cycle with weekly service for a steady crew, more frequent for heavy use or peak heat. The LA-specific value is scheduling service around the 5/10/60/710 pressure and dense-street access so units never get ahead of you on a months-long job.</p>`,
    film: `<h2>What Does Your Los Angeles Base Camp Actually Need?</h2>
      <hr class="gold-rule" />
      <p>This is the production capital, so base camp standards are high. For a lean day shoot, standard event-grade units work. For multi-day or talent-facing work, choose the climate-controlled trailer &mdash; on a long LA location day, crew comfort keeps the schedule and the trailer is talent-facing whether you planned it that way or not. Whatever the size, you want flexible placement and seven-day, off-hours dispatch, because LA call times ignore the clock.</p>`,
  },

  'porta-potties-north-miami': {
    construction: `<h2>Which Construction Unit Fits Your North Miami Site?</h2>
      <hr class="gold-rule" />
      <p>North Miami construction runs from remodels to road projects across the Biscayne Boulevard corridor and northeast Miami-Dade. For a standard commercial job, choose the 28-day unit with weekly service, set back from work zones, dumpsters, and storm drains. Two local variables push the decision: Biscayne Boulevard and marina-route traffic can squeeze delivery windows, so choose a route-aware schedule; and coastal humidity bakes a unit faster than inland, so do not skimp on service frequency.</p>`,
    event: `<h2>How Many Units Does Your North Miami Event Really Need?</h2>
      <hr class="gold-rule" />
      <p>Use the matrix, then plan for the coast. For a waterfront gathering or a community event near Aventura or Sunny Isles, choose presentation-ready units and account for wind and guest flow when you place them. Serving alcohol? Add 20%. In the South Florida heat and humidity, choose to pair handwash stations and keep units accessible to the service truck after the layout goes in &mdash; comfort fades fast in August.</p>`,
    wedding: `<h2>Trailer or Standard Units for Your North Miami Wedding?</h2>
      <hr class="gold-rule" />
      <p>For a smaller venue or backyard wedding under about 100 guests, flushable single units do the job. For an upscale coastal reception near Aventura or Sunny Isles, choose the climate-controlled restroom trailer &mdash; in the Miami heat, air conditioning in the restroom keeps guests at the party. Book early; in-season Saturdays and storm-season uncertainty both reward planning ahead.</p>`,
    ada: `<h2>How Many ADA Units Does Your North Miami Event Need?</h2>
      <hr class="gold-rule" />
      <p>One ADA unit for any permitted event, then one per ten standard units. On a coastal or waterfront site, soft and uneven ground makes firm, level placement harder &mdash; choose the spot on the main accessible path, level it properly, and keep it usable after tents and fencing go in. Distribute units across larger venues rather than clustering them.</p>`,
    handwash: `<h2>How Many Handwash Stations for Your North Miami Setup?</h2>
      <hr class="gold-rule" />
      <p>One station per two units to start. North Miami events with food vendors should choose dedicated stations near the food to satisfy Miami-Dade health requirements. On a construction or road-project site, one station at the unit cluster covers the crew &mdash; and in the coastal heat, handwashing access just keeps the site livable.</p>`,
    longterm: `<h2>Which Long-Term Plan Fits Your North Miami Site?</h2>
      <hr class="gold-rule" />
      <p>For longer northeast Miami-Dade builds and contractor rotations, the plan is reliable service through coastal traffic and weather. Choose the 28-day cycle with weekly service for a steady crew, stepped up for heavy use or peak heat. The North Miami value is routing around Biscayne Boulevard congestion plus storm-season responsiveness &mdash; when a unit needs securing or swapping ahead of weather, you want a managed plan, not a scramble.</p>`,
    film: `<h2>What Does Your North Miami Base Camp Actually Need?</h2>
      <hr class="gold-rule" />
      <p>Coastal South Florida pulls steady production and event work. For a lean day shoot, standard event-grade units at base camp are fine. For multi-day or talent-facing work, choose the climate-controlled trailer &mdash; Miami sun and humidity make crew comfort a scheduling issue. Whatever the size, you want seven-day, off-hours dispatch and placement that survives Biscayne-corridor traffic.</p>`,
  },

  'porta-potties-plano': {
    construction: `<h2>Which Construction Unit Fits Your Plano Site?</h2>
      <hr class="gold-rule" />
      <p>Plano construction is suburban commercial and contractor work across the Independence Parkway and Spring Creek corridors, with growth-area jobs out toward Allen and Frisco. For a standard build, choose the 28-day unit with weekly service and clear setbacks from work zones, dumpsters, and storm drains. The local variable is access timing: US-75 and the Dallas North Tollway shape delivery windows, so choose a route-aware schedule. And Texas summer heat is real &mdash; units run hotter and may need service stepped up in July and August.</p>`,
    event: `<h2>How Many Units Does Your Plano Event Really Need?</h2>
      <hr class="gold-rule" />
      <p>Use the matrix, then plan for Plano's event mix &mdash; school functions, church events, parks, races, and West Plano corporate gatherings. Choose units placed where guests can find them but clear of food and seating, and confirm the service truck can reach them after the buildout. Serving alcohol at a corporate event? Add 20%. In Texas summer heat, shade and handwash access keep the lines manageable.</p>`,
    wedding: `<h2>Trailer or Standard Units for Your Plano Wedding?</h2>
      <hr class="gold-rule" />
      <p>For a smaller venue or backyard wedding under about 100 guests, flushable single units are plenty. For an upscale West Plano reception, choose the climate-controlled restroom trailer &mdash; in the North Texas summer, air conditioning in the restroom keeps guests comfortable and at the party. Book early; in-season Saturdays in the Plano/Frisco area book out first.</p>`,
    ada: `<h2>How Many ADA Units Does Your Plano Event Need?</h2>
      <hr class="gold-rule" />
      <p>One ADA unit for any permitted Plano event, then one per ten standard units. Place it on firm, level ground near the main accessible path, and keep that route open after fencing and tents go in &mdash; at a school or park event, the ADA unit should not end up stranded behind the vendor row. Distribute units across larger venues rather than clustering them.</p>`,
    handwash: `<h2>How Many Handwash Stations for Your Plano Setup?</h2>
      <hr class="gold-rule" />
      <p>One station per two units as the baseline. Plano events with food vendors &mdash; school functions, church events, outdoor markets &mdash; should choose dedicated stations near the food to meet Collin County health expectations. On a commercial construction site, one station at the unit cluster keeps the crew compliant.</p>`,
    longterm: `<h2>Which Long-Term Plan Fits Your Plano Site?</h2>
      <hr class="gold-rule" />
      <p>For longer Plano and growth-area builds toward Allen and Frisco, a long-term plan is about consistent service across a spread-out suburban footprint. Choose the 28-day cycle with weekly service for a steady crew, more frequent for heavy use or peak summer heat. The Plano value is routing around US-75 and Dallas North Tollway windows so service holds steady on a months-long job.</p>`,
    film: `<h2>What Does Your Plano Base Camp Actually Need?</h2>
      <hr class="gold-rule" />
      <p>North Dallas pulls a steady stream of commercial and production work. For a lean day shoot, standard event-grade units at base camp are fine. For multi-day or talent-facing work, choose the climate-controlled trailer &mdash; Texas summer heat makes crew comfort a scheduling issue, not a perk. Whatever the size, you want seven-day, off-hours dispatch and placement that works around the Plano traffic corridors.</p>`,
  },
};

// Returns city-specific decision-fit HTML for a combo, or null to fall back to the generic.
export function getComboDecisionFit(citySlug, useCaseKey) {
  return COMBO_DECISION_FIT[citySlug]?.[useCaseKey] || null;
}
