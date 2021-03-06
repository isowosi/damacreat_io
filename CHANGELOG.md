# 0.11.3 (2021-02-09)

## Bugfix
* game could be joined before connection to server was fully initialised

# 0.11.2 (2020-09-27)

## Bugfix
* fixed a bug in a shader that only happend on some systems

# 0.11.1 (2020-09-19)

## Bugfix
* pack shaders into the source to prevent errors because of caching issues (and reduce the amount of requests and improve loading times)

# 0.11.0 (2020-09-17)

## Misc
* improved performance
* animated and more colorful background
* better handling of clients that don't support webgl

## Bugfixes
* size of moving dark energy off screen was not updated correctly
* serverside bug that crashed the server after a several months

# 0.10.1 (2019-05-23)

## Bugfixes
* fixed extreme drop in performance on firefox when rendering a black hole

# 0.10.0 (2019-05-22)

## Gameplay
* increased loss of size over time for bigger damacreats and reduced for smaller damacreats
* generate less dark energy when a player disconnects
* moving dark energy slowly dissipates even if it's not being absorbed by a damacreat
* added black holes to the world, black holes reduce the size of nearby damacreats (as long as the damacreat has a score of at least 30)
* damacreats can fire black holes with their black hole cannon (can be fire before it's loaded fully, but the resulting black hole will be smaller and shorter lived)

## Misc
* improved analytics
* visibility of leaderboard can be toogled
* added keyboard shortcuts for nicknames, leaderboard, fps, debug info and the minimap

## Bugfixes
* fixed several bugs introduced by the new netcode
* exhaust dark energy created by boosting was not correctly displayed when created by very large damacreats

# 0.9.0 (2019-04-06)

## Gameplay
* dark energy gets digested faster
* reduced max normal speed of players by 25% 
* increased boosted speed of players by 500%
* increased amount of food by 50%
* added bots (maximum of 20 bots, no bots spawn if there are at least 40 damacreats)

## Misc
* made digestion of dark energy visually more obvious
* better default names
* improved netcode and reduced amount of traffic
* added link to feedback form
* added link to isowosi Twitter

## Bugfixes
* fixed a source of several (actual and potential) bugs

# 0.8.0 (2018-11-17)

## Gameplay
* less and randomly distributed dark energy when a player disconnects

## Misc
* added initial gamepad support; just press start on your gamepad and you are in
* improved visuals of normal movement
* improved visuals of boosted movement

# 0.7.0 (2018-11-07)

## Gameplay
* using the boost reduces the size of the damacreat and produces dark energy
* food below a certain size is consumed instantly
* a player that disconnects or has a radius smaller than 5 will be turned into several pieces of dark energy 

## Misc
* performance improvement when there is a lot of moving food/dark energy
* the player can pick their color

## Bugfixes
* QuadTree wasn't updated correctly for moving stuff between two nodes resulting in performance degration over time
* improved rendering quality

# 0.6.0 (2018-09-25)

## Gameplay
* the maximum velocity of a damacreat depends on its size
* damacreats can use a temporary speed boost
* modified digestion speed - faster for small ones and slower for big ones

## Misc
* performance improvement updating the quadtree

# 0.5.1 (2018-09-22)

## Gameplay
* added a minimap

## Misc
* use Roboto font instead of Verdana everywhere
* show version in menu
* added changelog
* remember nickname when losing
* start game on enter
* store settings in browser
* added Google Analytics, updated privacy policy

## Bugfixes
* background was not rendered on mobile phones since 0.4.0, switched back to highp precision and disabled background rendering on devices not supporting highp precision in fragment shaders

# 0.5.0 (2018-09-19)

## Gameplay
* damacreats can eat other damacreats
* zoom depends on the size of the player

## Misc
* display error if connection to server fails
* improved leaderboard

## Bugfixes
* fixed a bug causing unneccessary network traffic when a player disconnects while consuming dark energy
* pinch zoom on mobile was still possible

# 0.4.0 (2018-09-16)

## Misc
* show player names
* disabled zooming
* improved general layout on mobile

## Bugfixes
* increased speed limit of vomitted dark energy
* layout on mobile when entering a name got messed up
* game could not start on devices not supporting highp in fragment shaders

# 0.3.0 (2018-09-13)

## Misc
* added a menu
* added privacy policy and imprint
* show errors if there are are errors when loading the game
* added settings and hid debug data by default

# 0.2.0 (2018-09-10)

## Gameplay
* dark energy bounces off borders

## Misc
* added touch control
* improved coloring of damacreats and background
* improved visuals of dark energy
* more colors
* switched from webgl2 to webgl1

## Bugfixes
* fixed shaking of damacreats
* background wasn't renered completely in some resolutions
* removed scrollbars on mobile
* fixed various visual bugs related to running the game in the background

# 0.1.0 (2018-09-07)

* Initial version
