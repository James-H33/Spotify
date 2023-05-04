use std::env;

use urlencoding::encode;
use serde::Deserialize;

static REDIRECT_URI: &str = "http://localhost:8000/spotify-auth-callback";
static mut AUTH_TOKEN: String = String::new();

#[derive(Deserialize)]
struct SpotifyTokenResponse {
  access_token: String,
  expires_in: u32,
  refresh_token: String,
  scope: String,
  token_type: String
}

pub struct SpotifyAuthUrl {
  pub url: String
}

pub fn get_spotify_auth_url() -> SpotifyAuthUrl {
  // Scopes -> https://developer.spotify.com/documentation/general/guides/authorization/scopes/
  let scope = encode("user-read-private user-read-email user-top-read user-library-read");
  let redirect_uri = encode(REDIRECT_URI);
  let state = get_env_var("STATE");
  let client_id = get_env_var("CLIENT_ID");

  unsafe {
    let params: Vec<String> = vec![
      "&response_type=code".to_string(),
      format!("&client_id={}", client_id),
      format!("&scope={}", scope.to_string()),
      format!("&redirect_uri={}", redirect_uri),
      format!("&state={}", state),
    ];


    let query_str = make_query_str(&params);
    let url = format!("https://accounts.spotify.com/authorize{}", query_str);

    SpotifyAuthUrl {
      url
    }
  }
}

#[get("/spotify-auth-callback?<code>&<state>")]
pub async fn handle_spotify_auth(code: Option<String>, state: Option<String>) -> &'static str {
  let response = get_auth_token(&code.unwrap()).await;

  unsafe {
    AUTH_TOKEN = response.access_token;
  }

  "Authorization Success! Return to application."
}

#[tauri::command]
pub fn get_token() -> Result<String, String> {
  let token = unsafe { AUTH_TOKEN.clone() };

  if token != "" {
    Ok(token)
  } else {
    Err("No result".into())
  }
}

fn get_env_var(key: &str) -> String {
  let (_, value): (String, String) = env::vars().find(|(k, _)| k == key).unwrap();

  value
}

async fn get_auth_token(code: &str) -> SpotifyTokenResponse {
  let redirect_uri = REDIRECT_URI;
  let auth_code = "authorization_code";
  let secret = get_env_var("SECRET");
  let client_id = get_env_var("CLIENT_ID");

  let params = [
    ("code", code),
    ("redirect_uri", redirect_uri),
    ("grant_type", auth_code),
    ("client_id", &client_id),
    ("client_secret", &secret),
  ];

  let url = "https://accounts.spotify.com/api/token";
  let client = reqwest::Client::new();

  let res = client.post(url)
    .header("Content-Type", "application/x-www-form-urlencoded")
    .form(&params)
    .send()
    .await;

  let result = res.unwrap();
  let token_res = result.json::<SpotifyTokenResponse>().await.unwrap();

  token_res
}

fn make_query_str(params: &Vec<String>) -> String {
  let mut query_str = String::from("?");

  for param in params {
    query_str += param;
  }

  query_str
}
