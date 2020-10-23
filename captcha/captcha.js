const gd = require('node-gd')

class Captcha {
    constructor() {
        this.width = 180
        this.height = 60
        this.colors = 'c'.repeat(5).split('').map(c => this.randomColor());
        this.font = '/Users/youi/WorkSpaces/git.server/cmb/LV89.05_uc/server/resources/segoeui.ttf';
        this.captcha = this.randomWord();
        this.img = gd.createTrueColorSync(this.width, this.height);
        this.img.fill(0, 0, gd.trueColor(255, 255, 255));

        this.drawTexts(this.captcha);
        // this.drawDashedLines(2); // 画虚线
        this.drawLines(4);
        this.drawArcs(4);
        this.drawPoints(1000);
        this.savePng()
    }

    randomInt(min, max) {
        if (arguments.length === 1) {
            return (Math.random() * min) | 0;
        } else {
            return (min + (Math.random() * (max - min))) | 0;
        }
    }
    randomX() {
        return this.randomInt(this.width);
    }
    randomY() {
        return this.randomInt(this.height);
    }
    randomRGB() {
        return this.randomInt(1, 130);
    }
    randomColor(choices) {
        if (choices) {
            return choices[(Math.random() * choices.length) | 0];
        } else {
            return gd.trueColor(this.randomRGB(), this.randomRGB(), this.randomRGB());
        }
    }
    randomWord() {
        const words = ['aaron', 'adler', 'adolf', 'aiken', 'akron', 'alcoa', 'aldan', 'alden', 'allan', 'alsop', 'angel', 'angie', 'annam', 'apple', 'april', 'arabs', 'aries', 'arron', 'aspen', 'aston', 'astor', 'atlas', 'babur', 'bacon', 'baden', 'baker', 'barth', 'bates', 'bauer', 'beach', 'beard', 'behan', 'berle', 'blatz', 'bloom', 'boise', 'boole', 'brits', 'bruno', 'bunin', 'burch', 'burke', 'burks', 'burma', 'busch', 'byers', 'byron', 'cains', 'carly', 'cindy', 'claus', 'cliff', 'cohen', 'colin', 'colon', 'conan', 'creon', 'crick', 'cyrus', 'dacca', 'daisy', 'dakar', 'daren', 'darth', 'daryl', 'debra', 'decca', 'ekind', 'degas', 'dhaka', 'dijon', 'dinah', 'dolby', 'dolly', 'donna', 'dover', 'downs', 'druid', 'dumas', 'dumbo', 'ebola', 'ebony', 'edgar', 'eliot', 'elisa', 'elise', 'eliza', 'ellis', 'elmer', 'essie', 'euler', 'evans', 'fagin', 'faith', 'fidel', 'floyd', 'fosse', 'erick', 'freon', 'freud', 'gamay', 'gamow', 'gates', 'gayle', 'ginsu', 'gipsy', 'glenn', 'godot', 'gogol', 'golan', 'golda', 'goths', 'gouda', 'greta', 'grieg', 'haiti', 'hanoi', 'hardy', 'harry', 'harte', 'heine', 'hench', 'hicks', 'hilda', 'hindi', 'hiram', 'hooke', 'house', 'hoyle', 'huron', 'iblis', 'intel', 'inuit', 'invar', 'ionic', 'iowan', 'iraqi', 'irvin', 'ishim', 'issac', 'ivory', 'izaak', 'izmir', 'jaime', 'jamie', 'janet', 'javas', 'jayne', 'jenna', 'jidda', 'jonah', 'jonas', 'judah', 'jules', 'kelli', 'kelly', 'kenny', 'laius', 'lapps', 'larry', 'leger', 'leigh', 'lenny', 'lents', 'leola', 'lewis', 'lizzy', 'lloyd', 'locke', 'lodge', 'loewe', 'loewi', 'loire', 'loren', 'lucas', 'lucia', 'lynda', 'macao', 'onian', 'macon', 'madge', 'malta', 'mamet', 'march', 'marci', 'marks', 'marla', 'marne', 'mason', 'mayas', 'mayer', 'mccoy', 'mejia', 'menes', 'mensa', 'merak', 'merck', 'miami', 'midas', 'milne', 'mizar', 'mobil', 'molly', 'moors', 'mujib', 'munch', 'mylar', 'nadia', 'naomi', 'nepal', 'oyotl', 'nikki', 'nikon', 'noemi', 'north', 'occam', 'omaha', 'onion', 'oscar', 'patna', 'perez', 'peron', 'perot', 'petra', 'petty', 'pigmy', 'pitts', 'plath', 'pluto', 'poles', 'praia', 'punch', 'qatar', 'queen', 'reich', 'remus', 'ricky', 'rivas', 'rizal', 'roach', 'robby', 'rodin', 'sabre', 'sagan', 'sahel', 'sandy', 'sarah', 'saran', 'saudi', 'savoy', 'scott', 'sears', 'selim', 'sheri', 'shrek', 'shula', 'sibyl', 'simon', 'sinai', 'sloan', 'small', 'soddy', 'solis', 'speer', 'spica', 'stark', 'sulla', 'sunni', 'surat', 'sweet', 'tahoe', 'tarim', 'tasha', 'texan', 'thant', 'tibet', 'tokyo', 'tomas', 'tommy', 'tomsk', 'tonga', 'trudy', 'tudor', 'tycho', 'tyler', 'tyree', 'union', 'urban', 'uriah', 'vegas', 'virgo', 'welch', 'wells', 'welsh', 'wezen', 'whigs', 'wolff', 'woods', 'wyatt', 'wyeth', 'yahoo', 'yakut', 'yanks', 'yeats', 'zelma', 'ziggy', 'nisms', 'abaci', 'abash', 'abets', 'abhor', 'abide', 'abler', 'abode', 'abort', 'about', 'abuzz', 'acmes', 'acorn', 'acrid', 'adieu', 'adiós', 'tions', 'admit', 'adobe', 'agave', 'agism', 'agree', 'alist', 'album', 'alder', 'alibi', 'allay', 'alley', 'aloft', 'aloha', 'alone', 'alter', 'altho', 'amaze', 'ships', 'amber', 'ameer', 'amend', 'amigo', 'amirs', 'amiss', 'angel', 'anger', 'annoy', 'gists', 'rphic', 'antic', 'sants', 'anvil', 'aping', 'appal', 'apple', 'apply', 'aptly', 'ardor', 'argot', 'argue', 'arias', 'array', 'ashen', 'askew', 'aspen', 'atlas', 'cally', 'atoll', 'atria', 'aurae', 'autos', 'avail', 'aware', 'awash', 'awful', 'awing', 'axing', 'axiom', 'axles', 'axons', 'azure', 'babel', 'babes', 'aling', 'backs', 'bagel', 'baits', 'baize', 'balms', 'balmy', 'balsa', 'banns', 'barbs', 'baser', 'batch', 'bates', 'bawls', 'bayou', 'becks', 'rocks', 'rolls', 'times', 'beech', 'beers', 'beets', 'began', 'begat', 'beget', 'below', 'belts', 'bergs', 'berms', 'beryl', 'besot', 'biker', 'bikes', 'binds', 'birch', 'birds', 'birth', 'black', 'blade', 'blank', 'blasé', 'blaze', 'bless', 'blest', 'blimp', 'blips', 'bliss', 'bluer', 'blunt', 'bobby', 'bodes', 'bogie', 'bonds', 'boner', 'bones', 'bonny', 'bonus', 'boobs', 'booby', 'books', 'borer', 'bosom', 'bossy', 'bosun', 'bowel', 'boxer', 'brads', 'brags', 'braid', 'break', 'brews', 'briar', 'bribe', 'brink', 'briny', 'brisk', 'brown', 'brusk', 'brute', 'bulge', 'bulgy', 'bulks', 'bulky', 'bunts', 'buoys', 'burgs', 'burnt', 'burst', 'busby', 'buses', 'butch', 'buxom', 'buyer', 'byway', 'cabal', 'cable', 'cacao', 'cache', 'cacti', 'caddy', 'cadet', 'cadge', 'cagey', 'cairn', 'calks', 'calls', 'calms', 'camps', 'campy', 'canal', 'canny', 'carat', 'cargo', 'carol', 'carps', 'carry', 'tions', 'caulk', 'cells', 'chant', 'chaos', 'chaps', 'chapt', 'chars', 'chart', 'chary', 'cheer', 'chefs', 'chile', 'chink', 'chino', 'chins', 'choir', 'choke', 'chomp', 'chows', 'cally', 'chuck', 'chums', 'churn', 'tions', 'gates', 'clang', 'claps', 'clash', 'clasp', 'clefs', 'clews', 'click', 'cling', 'clipt', 'clops', 'close', 'cloth', 'clove', 'clubs', 'clung', 'cobra', 'cocky', 'codes', 'codex', 'coifs', 'cokes', 'colic', 'colon', 'comas', 'combo', 'combs', 'comfy', 'izing', 'ingly', 'condo', 'ality', 'ional', 'conga', 'tions', 'tions', 'cooky', 'cools', 'coots', 'corks', 'corms', 'corns', 'ingly', 'costs', 'cotes', 'iming', 'coves', 'crack', 'craft', 'crave', 'craze', 'itors', 'creek', 'creel', 'creep', 'crepe', 'crews', 'cribs', 'cries', 'crops', 'cross', 'crown', 'cubic', 'curls', 'curly', 'curry', 'dacha', 'daddy', 'yping', 'dares', 'datum', 'deals', 'dealt', 'debts', 'decks', 'oning', 'izing', 'ucing', 'deity', 'dells', 'delta', 'cally', 'demon', 'ively', 'demos', 'dicey', 'dicks', 'diets', 'ating', 'dimes', 'dimly', 'diner', 'dines', 'dingo', 'dings', 'dingy', 'dinky', 'diode', 'ingly', 'ments', 'rians', 'disco', 'lates', 'ances', 'ation', 'ities', 'ement', 'disks', 'ately', 'fully', 'divan', 'ation', 'dives', 'divot', 'dodge', 'dodos', 'dogie', 'dogma', 'dooms', 'dorky', 'dorms', 'doses', 'dotes', 'dotty', 'doubt', 'dough', 'dowdy', 'dowel', 'downs', 'dozes', 'drabs', 'drain', 'drake', 'drama', 'drams', 'drank', 'drawn', 'drier', 'drily', 'drink', 'drips', 'drive', 'droll', 'aries', 'drone', 'drool', 'droop', 'drops', 'dross', 'dryer', 'dryly', 'ducal', 'ducat', 'dukes', 'dulls', 'dully', 'dummy', 'dunce', 'dunes', 'dungs', 'dunks', 'dunno', 'dusts', 'dwarf', 'dweeb', 'dwell', 'earls', 'early', 'edema', 'edger', 'netic', 'elegy', 'emend', 'emery', 'emote', 'enema', 'enjoy', 'urial', 'equal', 'equip', 'erase', 'erect', 'cally', 'event', 'every', 'evoke', 'exalt', 'ation', 'execs', 'ation', 'exist', 'ients', 'expos', 'cular', 'arily', 'eying', 'eyrie', 'facet', 'farce', 'fault', 'fells', 'felon', 'fence', 'fends', 'ferry', 'fests', 'fetal', 'fetch', 'fetid', 'fetus', 'feuds', 'fiefs', 'fifth', 'files', 'filet', 'fills', 'filly', 'finch', 'finds', 'finer', 'finks', 'firms', 'fists', 'fitly', 'fiver', 'fixes', 'fizzy', 'fjord', 'flack', 'flair', 'flake', 'flare', 'flays', 'fleas', 'flees', 'fleet', 'flesh', 'ibbet', 'flick', 'flier', 'flies', 'flips', 'float', 'flock', 'flood', 'flora', 'floss', 'flour', 'flout', 'flown', 'flows', 'flume', 'flung', 'foals', 'foams', 'fogey', 'foggy', 'foils', 'folio', 'folks', 'folly', 'foods', 'foray', 'force', 'fords', 'fores', 'forte', 'forth', 'freer', 'frees', 'fries', 'frump', 'fusty', 'futon', 'games', 'gamey', 'gamin', 'gamma', 'gauge', 'gawky', 'gazes', 'gears', 'gelid', 'tions', 'genes', 'genie', 'genii', 'genre', 'germs', 'gifts', 'gilds', 'gills', 'gilts', 'gimme', 'gimpy', 'glade', 'glads', 'gloss', 'glove', 'gluey', 'gnarl', 'gnash', 'gnaws', 'gnome', 'godly', 'gofer', 'going', 'golds', 'gongs', 'gonna', 'goofs', 'goofy', 'gooks', 'goons', 'gorge', 'gorse', 'gourd', 'grace', 'grade', 'grain', 'grape', 'graph', 'grasp', 'grass', 'grate', 'grave', 'graze', 'grids', 'grief', 'grind', 'grins', 'gripe', 'grits', 'groan', 'grubs', 'grunt', 'guano', 'guard', 'gulag', 'gulch', 'gushy', 'gusty', 'gutsy', 'gyros', 'habit', 'hacks', 'hairy', 'hakes', 'haler', 'enics', 'halon', 'halos', 'halts', 'hares', 'harks', 'harms', 'hatch', 'hater', 'hates', 'heady', 'heals', 'gerow', 'heels', 'hefts', 'hefty', 'heirs', 'heist', 'helix', 'heron', 'hides', 'hilly', 'hippy', 'hires', 'hitch', 'hives', 'hokey', 'homie', 'hones', 'honey', 'honks', 'honor', 'hooks', 'hooky', 'hopes', 'hound', 'hours', 'house', 'hovel', 'hover', 'huffy', 'humor', 'humps', 'hurls', 'hurry', 'hydra', 'hyena', 'hying', 'image', 'imams', 'imply', 'ncies', 'ously', 'ately', 'sness', 'inert', 'infer', 'mally', 'infix', 'tures', 'ingot', 'ients', 'antly', 'ously', 'alist', 'ality', 'alism', 'ation', 'inter', 'eable', 'ction', 'irate', 'irons', 'irony', 'iable', 'itchy', 'items', 'jails', 'jambs', 'jihad', 'jilts', 'jokes', 'jolly', 'jolts', 'joule', 'joust', 'jowls', 'judge', 'julep', 'junky', 'junta', 'juror', 'kabob', 'karma', 'kayak', 'kebob', 'kills', 'kinks', 'kinky', 'kiosk', 'kites', 'knell', 'knelt', 'knobs', 'known', 'knows', 'label', 'laces', 'cally', 'lacks', 'laden', 'lades', 'lairs', 'lamas', 'lambs', 'lamer', 'lames', 'lamps', 'lapel', 'latch', 'later', 'laugh', 'leach', 'leads', 'leafs', 'leafy', 'leaks', 'leaky', 'leapt', 'leeks', 'leers', 'leery', 'legal', 'level', 'lever', 'tions', 'licit', 'light', 'liken', 'liker', 'likes', 'limns', 'lists', 'liter', 'lobby', 'lofty', 'looms', 'loons', 'loony', 'loops', 'loopy', 'lopes', 'lords', 'lorry', 'loser', 'louse', 'lover', 'lucky', 'lucre', 'lulls', 'lumps', 'lungs', 'lusty', 'macho', 'macro', 'mamas', 'mambo', 'mangy', 'mania', 'manic', 'manly', 'manse', 'mares', 'marry', 'mason', 'matte', 'matts', 'matzo', 'mauls', 'means', 'meant', 'meats', 'meaty', 'mecca', 'alist', 'dlers', 'dling', 'icate', 'ullae', 'ullas', 'meets', 'melds', 'meows', 'mercy', 'merry', 'metes', 'ssors', 'midst', 'might', 'miler', 'miles', 'minds', 'miner', 'minty', 'mirth', 'eting', 'nting', 'mists', 'misty', 'miter', 'mocks', 'modal', 'model', 'modem', 'modes', 'moist', 'molts', 'mooch', 'moods', 'mores', 'morns', 'moron', 'motes', 'moths', 'motif', 'motor', 'mouth', 'mover', 'moves', 'mucks', 'muddy', 'muffs', 'munch', 'murky', 'music', 'musky', 'mussy', 'musts', 'mutes', 'nails', 'nasty', 'naval', 'navel', 'naves', 'neath', 'necks', 'nerdy', 'nerve', 'nervy', 'newer', 'newly', 'niche', 'nicks', 'niece', 'nimbi', 'nines', 'nobly', 'nodal', 'noddy', 'noose', 'norms', 'noses', 'nosey', 'notch', 'notes', 'nding', 'novas', 'nukes', 'oases', 'oaths', 'ience', 'obits', 'oboes', 'ocean', 'odder', 'often', 'okras', 'olden', 'omens', 'omits', 'onion', 'optic', 'orals', 'orate', 'orbit', 'order', 'other', 'otter', 'ought', 'ovals', 'ovary', 'izing', 'ovoid', 'ovule', 'owing', 'owlet', 'owner', 'oxbow', 'oxide', 'packs', 'pacts', 'paddy', 'pagan', 'pager', 'pages', 'pails', 'gists', 'paler', 'panda', 'pangs', 'panic', 'pansy', 'papal', 'papas', 'nesis', 'passé', 'pasta', 'patty', 'pease', 'erast', 'estal', 'icure', 'peeks', 'peels', 'peeps', 'pence', 'pends', 'icals', 'pists', 'cally', 'cence', 'piece', 'pigmy', 'pilau', 'pilaw', 'piles', 'pills', 'pilot', 'pimps', 'pinks', 'pinky', 'pinup', 'pipes', 'pipit', 'pique', 'piton', 'pixie', 'plain', 'plays', 'plaza', 'plead', 'pleas', 'pleat', 'plops', 'pluck', 'plugs', 'plumb', 'plums', 'point', 'pokes', 'pokey', 'polyp', 'ponds', 'pools', 'poses', 'pouts', 'prawn', 'prays', 'ators', 'preys', 'price', 'prick', 'pricy', 'prime', 'primp', 'ation', 'proms', 'prone', 'prosy', 'apist', 'pubic', 'pucks', 'puffy', 'pulps', 'pulpy', 'pulse', 'pumas', 'pumps', 'pupal', 'pupas', 'quack', 'quest', 'quill', 'quilt', 'quips', 'quire', 'quits', 'quoit', 'quota', 'radii', 'radio', 'hones', 'pists', 'radon', 'ramps', 'ranks', 'rares', 'rasps', 'ation', 'raven', 'reals', 'reams', 'rebel', 'rebus', 'tions', 'ation', 'recta', 'eemer', 'efine', 'reeve', 'reign', 'remit', 'rents', 'tions', 'repay', 'rests', 'retch', 'ively', 'retry', 'rheum', 'rices', 'ricks', 'rider', 'rides', 'ridge', 'rifer', 'riffs', 'rinds', 'rings', 'rinks', 'risen', 'riser', 'rises', 'risks', 'rocks', 'rocky', 'rodeo', 'roomy', 'route', 'routs', 'roués', 'rover', 'rowel', 'runes', 'rungs', 'runny', 'rusty', 'saber', 'sable', 'sabre', 'sager', 'sandy', 'saner', 'saree', 'saris', 'saver', 'saves', 'scads', 'scald', 'scale', 'scalp', 'scaly', 'scamp', 'scant', 'scare', 'scone', 'scoop', 'scoot', 'scope', 'score', 'scorn', 'scour', 'scout', 'scowl', 'scows', 'screw', 'scrip', 'scuds', 'seals', 'ately', 'atest', 'ating', 'seeps', 'senna', 'lists', 'sense', 'lists', 'setup', 'sexes', 'shads', 'shady', 'shaky', 'shams', 'shank', 'share', 'shark', 'sharp', 'shave', 'shawl', 'sheer', 'sheet', 'sheik', 'sherd', 'shies', 'shine', 'shins', 'shire', 'shirk', 'shirr', 'shoon', 'shoos', 'shoot', 'short', 'shove', 'shown', 'shows', 'shrub', 'shuck', 'shuns', 'shunt', 'shush', 'sidle', 'siege', 'sieve', 'sifts', 'sighs', 'silts', 'siren', 'sires', 'sirup', 'sixty', 'sizer', 'addle', 'skews', 'skies', 'skimp', 'slack', 'slags', 'slain', 'slash', 'slate', 'slats', 'ouses', 'slave', 'slays', 'sleek', 'sleep', 'slide', 'slimy', 'sling', 'slobs', 'sloop', 'slope', 'slops', 'slums', 'slung', 'slunk', 'slurp', 'slurs', 'slush', 'sluts', 'smart', 'smote', 'smuts', 'snags', 'snail', 'snarl', 'sneak', 'snoot', 'snore', 'snort', 'snubs', 'snuck', 'soapy', 'soars', 'sober', 'socks', 'soggy', 'sonar', 'songs', 'sonic', 'sonny', 'sores', 'sorry', 'sorta', 'sorts', 'sough', 'souls', 'sound', 'soups', 'souse', 'spare', 'spats', 'speak', 'spear', 'tions', 'sperm', 'spies', 'spike', 'spiky', 'spill', 'split', 'spoon', 'spoor', 'stabs', 'stack', 'staff', 'stare', 'stark', 'stars', 'stats', 'stave', 'stays', 'stead', 'stews', 'still', 'stint', 'stirs', 'stoic', 'stoke', 'stone', 'stony', 'storm', 'strep', 'strut', 'stubs', 'stuck', 'studs', 'study', 'stung', 'ctors', 'surge', 'swags', 'swaps', 'sward', 'sways', 'swear', 'sweat', 'swoon', 'swoop', 'swops', 'sword', 'swore', 'ation', 'tacks', 'tacky', 'tacos', 'takes', 'tamer', 'tames', 'tamps', 'tango', 'tangs', 'tarot', 'teaks', 'teats', 'cally', 'telex', 'tells', 'tally', 'temps', 'terns', 'thees', 'theft', 'their', 'thief', 'thigh', 'thine', 'third', 'throb', 'thrum', 'thuds', 'thugs', 'tibia', 'tiger', 'tills', 'tilts', 'timer', 'tinny', 'tipsy', 'tithe', 'title', 'tizzy', 'toast', 'today', 'toddy', 'token', 'tones', 'toots', 'toque', 'torch', 'torsi', 'torso', 'touch', 'tough', 'tours', 'tower', 'towns', 'trade', 'train', 'trait', 'tramp', 'trams', 'ating', 'ation', 'trash', 'treat', 'trees', 'treks', 'trial', 'tribe', 'trope', 'oting', 'trout', 'trues', 'truly', 'trump', 'truth', 'tryst', 'tufts', 'tulip', 'tunas', 'tuner', 'tunes', 'tunic', 'tunny', 'tusks', 'tweak', 'twice', 'twigs', 'twill', 'twits', 'tying', 'cally', 'typos', 'ulnas', 'nding', 'nally', 'sness', 'ingly', 'ments', 'undid', 'undue', 'nable', 'nally', 'units', 'unpin', 'eable', 'ingly', 'nlike', 'untie', 'until', 'unzip', 'usual', 'usurp', 'usury', 'valet', 'valid', 'valor', 'vapid', 'veers', 'vegan', 'veils', 'veins', 'velds', 'veldt', 'vests', 'vials', 'viand', 'vibes', 'vigil', 'viola', 'viols', 'viper', 'viral', 'visor', 'vista', 'vital', 'vivas', 'vivid', 'vixen', 'votes', 'waifs', 'waive', 'wanly', 'watts', 'waver', 'waxes', 'weeks', 'weeps', 'weigh', 'weird', 'weirs', 'wheat', 'whens', 'where', 'whets', 'while', 'whims', 'whine', 'whiny', 'whirs', 'whisk', 'wicks', 'wills', 'wilts', 'wimps', 'wimpy', 'winks', 'wises', 'wisps', 'wizes', 'women', 'woods', 'woody', 'wooly', 'woozy', 'words', 'wraps', 'wrapt', 'wreck', 'wrens', 'wrest', 'yacht', 'yacks', 'yarns', 'yawls', 'yocks', 'yodel', 'yogin', 'yogis', 'yokel', 'young', 'yowls', 'yucca', 'yucks', 'yucky', 'zebra', 'zests', 'zilch', 'zippy', 'zooms'];

        return words[(words.length * Math.random()) | 0];
    }
    randomText() {
        return Math.random().toString(36).slice(-4);
    }

    drawDashedLines(number) {
        for (let i = 0; i < number; i++) {
            const X1 = this.randomX();
            const Y1 = this.randomY();

            const X2 = this.randomX();
            const Y2 = this.randomY();

            const color = this.randomColor(this.colors);

            this.img.dashedLine(X1, Y1, X2, Y2, color);
        }
    }
    drawLines(number) {
        for (let i = 0; i < number; i++) {
            const X1 = this.randomX();
            const Y1 = this.randomY();

            const X2 = this.randomX();
            const Y2 = this.randomY();

            const color = this.randomColor(this.colors);

            this.img.line(X1, Y1, X2, Y2, color);
        }
    }
    drawPoints(number) {
        for (let i = 0; i < number; i++) {
            const X = this.randomX();
            const Y = this.randomY();

            const color = this.randomColor(this.colors);

            this.img.setPixel(X, Y, color);
        }
    }
    drawArcs(number) {
        for (let i = 0; i < number; i++) {
            const X = this.randomX();
            const Y = this.randomY();

            const width = this.randomY();
            const height = this.randomY();

            const startAngle = this.randomInt(0, 270);
            const endAngle = this.randomInt(0, 270);

            const color = this.randomColor(this.colors);
            this.img.arc(X, Y, width, height, startAngle, endAngle, color);
        }
    }
    drawTexts(textStr) {
        const space = (this.width / textStr.length) * 0.8;
        for (let i = 0; i < textStr.length; i++) {
            const color = this.randomColor(this.colors);
            const size = 35;

            // 分格，再在每个格子的中间位置进行左右偏移，(-0.5到0.5) * 0.7
            const X = ((i + 0.5 + (Math.random() - 0.5) * 0.7) * space) | 0;
            const Y = this.randomInt(35, 55);

            const angle = Math.random() - 0.5;

            const char = textStr[i];

            this.img.stringFT(color, this.font, size, angle, X, Y, char);
        }
    }
    savePng() {
        this.img.savePng('output.png', 1, (err) => {
            if (err) {
                throw err;
            }
        })
    }
}

new Captcha()


