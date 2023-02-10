export interface Photo {
  id: number;
  alt: string;
  avg_color: string;
  height: number;
  width: number;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  url: string;
  src: {
    landscape: string;
    large: string;
    large2x: string;
    medium: string;
    original: string;
    portrait: string;
    small: string;
    tiny: string;
  };
}
export default interface Response {
  page: number;
  per_page: number;
  next_page: string;
  prev_page: string;
  total_results: number;
  photos: Photo;
}
