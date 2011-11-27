require 'rubygems'
require 'sinatra'
require 'omniauth'
require 'omniauth-twitter'
require 'json'

enable :sessions
enable :static
set :public_folder, './src'
use Rack::Session::Cookie
use OmniAuth::Builder do
  provider :twitter, 'o34XdCrvjvl0Q42yzN6A', 'EqepTHaFugcAPYrc3OJYRWLkQpXJHogmjEMZ8KHgwLE'
end

get '/' do
  <<-HTML
  <html>
  <head>
  <title>Twitter OAuth via popup</title>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
  <script src="/jquery.oauthpopup.js"></script>
  </head>
  <body>
  <script>
  $(document).ready(function(){
    $('#connect').click(function(){
      $.oauthpopup({
        path: '/auth/twitter',
        callback: function(){
          $.get('/user_info', function(data){
            $('#user_info').html(JSON.stringify(data));
          });
        }
      });
    });
  });
  </script>
  <div id="user_info"></div>
  <input type="button" value="Connect with Twitter" id="connect" /><br />
  <a href="/signout">Sign Out</a>
  </body>
  </html>
  HTML
end

get '/user_info' do
  content_type :json
  session[:info].to_json
end

get '/auth/:name/callback' do
  session[:info] = request.env['omniauth.auth'][:info]
  <<-HTML
  <script>
  window.close();
  </script>
  HTML
end

get '/signout' do
  session.clear
  redirect '/'
end
