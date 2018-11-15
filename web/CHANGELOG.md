# 0.8.0 (2018-11-11)

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