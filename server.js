// Retweeter Bot for Twitter
// Gabriel Santos 
// https://twitter.com/yejistars
// https://twitter.com/TecladoBot
// https://twitter.com/darthreputation
// https://github.com/GabrielSantosM
// https://twitter.com/DahyunRT_Bot

//-------------------------------------------------
 
const Twit = require('twit');
require('dotenv').config();

const T = new Twit ({
  consumer_key:         process.env.BOT_CONSUMER_KEY,
  consumer_secret:      process.env.BOT_CONSUMER_SECRET,
  access_token:     	process.env.BOT_ACCESS_TOKEN,
  access_token_secret:  process.env.BOT_ACCESS_TOKEN_SECRET,
});

//change 'track' to your word
// avoid to choose name of celebrities or very populars
// words because your bot can be suspended by spam
const stream = T.stream('statuses/filter', { track: 'teclado' })


// IMPORTANT!! - Dont change anything bellow this to avoid errors

console.log('Running Bot!!');

stream.on('tweet', function (tweet){
    //console.log(tweet)
    const Quote = tweet.is_quote_status !== true;

    var txt = tweet.text;
    var regex = new RegExp('aregex');
    var regex = /\svassoura?\s?/g;             
    var results = txt.match(regex);
    var regex2 = /\ssorriso?\s?/g;             
    var results2 = txt.match(regex2); 
  
    verify();

    function verify(){
        if (results) {
        return
        }if(results2){
          return
        }else{
            RTLIKE();
        }
    }

    const location = tweet.user.location !== null;
    const tweetID = tweet.id_str;
    const twitterUser = tweet.user.screen_name;

    function RTLIKE(){
        if (location && Quote){
            retweet();
        }else{
            like();
        }
    }
    function retweet(){
        T.post('statuses/retweet/:id', { id: tweet.id_str}, function(err, data, response){
            if (!err){
                console.log('Retweeted Status: ' + ' https://twitter.com/'+ tweet.user.screen_name +  '/status/' + tweet.id_str)
            }else {
                if (err.code == '327'){
                    return;
                }else{
                    console.log ('Cannot Retweet: Err '+ err.code + ' ' + err.message + ' '), like();
                }
            }
        })
    }

    function like(){
        T.post('favorites/create', {id: tweet.id_str}, function(err, data, response){
            if (!err){
                console.log('Liked Status: ' + ' https://twitter.com/'+ tweet.user.screen_name +  '/status/' + tweet.id_str)
                }if (err){
                    if(err.code == '139'){
                    return;
                }else {
                    console.log ('Cannot Like Tweet: Err '+ err.code +' ' + err.message)
                }
            }      
        })
    }
    function block(){
        T.post('blocks/create', {screen_name: tweet.user.screen_name}, function(err, data, response){
            if (!err){
                console.log('Blocked User: ' + ' https://twitter.com/'+ tweet.user.screen_name)
                }if (err){
                 console.log ('Cannot Block User ' + "https://twitter.com/"+ tweet.user.screen_name + ' ' + 'Code '+ err.code +' ' + err.message)
            }      
        })
    }
});
