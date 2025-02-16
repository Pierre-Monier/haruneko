export const protoTypes = `
package ComicFuz;
syntax = "proto3";

// common
message DeviceInfo {
  optional uint32 deviceType = 3;
}

// Manga
message MangasByDayOfWeekRequest {
  optional DeviceInfo deviceInfo = 1;
  optional uint32 dayOfWeek = 2;
}

message MangasByDayOfWeekResponse {
  repeated Manga mangas = 1;
}

message Manga {
  optional uint32 id = 1;
  optional string title = 2;
}

// Chapter
message MangaDetailRequest {
  optional DeviceInfo deviceInfo = 1;
  optional uint32 mangaId = 2;
}

message MangaDetailResponse {
  optional Manga manga = 2;
  repeated ChapterGroup chapters = 3;
}

message ChapterGroup {
  repeated Chapter chapters = 2;
}

message Chapter {
  optional uint32 id = 1;
  optional string title = 2;
}

// Page
message MangaViewerRequest {
  optional DeviceInfo deviceInfo = 1;
  optional uint32 chapterId = 2;
  optional bool useTicket = 3;
  optional UserPoint consumePoint = 4;
  optional ViewerMode viewerMode = 5; 
}

message MangaViewerResponse {
  repeated ViewerPage pages = 3;
}

message UserPoint {
  optional uint32 event = 1;
  optional uint32 paid = 2;
}

message ViewerMode {
  optional uint32 imageQuality = 1;
}

message ViewerPage {
  optional Image image = 1;
}

message Image {
  optional string imageUrl = 1;
  optional string urlScheme = 2;
  optional string iv = 3;
  optional string encryptionKey = 4;
  optional uint32 imageWidth = 5;
  optional uint32 imageHeight = 6;
  optional bool isExtraPage = 7;
}
`;