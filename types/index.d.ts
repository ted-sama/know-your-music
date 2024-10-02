// Représente la réponse principale pour les shows/pistes
interface SpotifyShowsResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SavedTrackObject[];
  }
  
  // Représente un objet SavedTrack contenant la date d'ajout et les informations sur le track
  interface SavedTrackObject {
    added_at: string;
    track: Track;
  }
  
  // Représente un track complet avec toutes ses propriétés
  interface Track {
    album: Album;
    artists: SimplifiedArtistObject[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIdObject;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from?: any; // Peut être typé en fonction des données réelles retournées
    restrictions?: RestrictionsObject;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: 'track';
    uri: string;
    is_local: boolean;
  }
  
  // Représente un album avec ses informations
  interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: RestrictionsObject;
    type: 'album';
    uri: string;
    artists: SimplifiedArtistObject[];
  }
  
  // Représente un artiste simplifié
  interface SimplifiedArtistObject {
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
  }
  
  // Représente les URLs externes (par exemple, Spotify)
  interface ExternalUrlObject {
    spotify: string;
  }
  
  // Représente les images associées à un album ou une piste
  interface ImageObject {
    url: string;
    height: number;
    width: number;
  }
  
  // Représente les identifiants externes (ex. ISRC, UPC)
  interface ExternalIdObject {
    isrc?: string;
    ean?: string;
    upc?: string;
  }
  
  // Représente les restrictions éventuelles sur un contenu (par exemple, restrictions de marché)
  interface RestrictionsObject {
    reason: string;
  }
  