#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use std::str::FromStr;
use rocket_cors::AllowedMethods;
use rocket_cors::{AllowedOrigins, AllowedHeaders};

mod spotify_auth;

#[tauri::command]
fn get_spotify_auth_url() -> Result<String, String> {
  let response = spotify_auth::get_spotify_auth_url();
  let url = response.url;

  if url != "" {
    Ok(url)
  } else {
    Err("No result".into())
  }
}

fn main() {
  let allowed_origins = AllowedOrigins::all();
  let allowed_methods: AllowedMethods = ["Get", "Post", "Delete"]
    .iter()
    .map(|s| FromStr::from_str(s).unwrap())
    .collect();

  let cors = rocket_cors::CorsOptions {
      allowed_origins,
      allowed_methods,
      allowed_headers: AllowedHeaders::all(),
      allow_credentials: true,
      ..Default::default()
  }
  .to_cors();

  tauri::Builder::default()
    .setup(|app| {
      tauri::async_runtime::spawn(
        rocket::build()
          .mount(
            "/",
            rocket::routes![spotify_auth::handle_spotify_auth]
          )
          .manage(cors)
          .launch()
      );
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![get_spotify_auth_url, spotify_auth::get_token])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
