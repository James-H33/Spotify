use urlencoding::encode;
use serde::Deserialize;

static CLIENT_ID: &str = "";
static SECRET: &str = "";
static STATE: &str = "";
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
  let scope = encode("user-read-private user-read-email");
  let redirect_uri = encode(REDIRECT_URI);

  let params: Vec<String> = vec![
    "&response_type=code".to_string(),
    format!("&client_id={}", CLIENT_ID),
    format!("&scope={}", scope.to_string()),
    format!("&redirect_uri={}", redirect_uri),
    format!("&state={}", STATE),
  ];

  let query_str = make_query_str(&params);
  let url = format!("https://accounts.spotify.com/authorize{}", query_str);

  SpotifyAuthUrl {
    url
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

async fn get_auth_token(code: &str) -> SpotifyTokenResponse {
  let redirect_uri = REDIRECT_URI;
  let auth_code = "authorization_code";

  let params = [
    ("code", code),
    ("redirect_uri", redirect_uri),
    ("grant_type", auth_code),
    ("client_id", CLIENT_ID),
    ("client_secret", SECRET),
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
