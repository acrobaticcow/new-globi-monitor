import { currentTime, getRandInt } from "./function";

const current = Date.now();

export default function generate_data(patient_id = "") {
  return {
    patient_id: patient_id,
    from: Math.floor(Date.now() / 1000),
    to: Math.floor(Date.now() / 1000) + 5,
    wave: {
      ecg_wave: [
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 124, 124, 124,
        124, 125, 125, 125, 125, 124, 123, 123, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 121, 121, 121, 121, 121, 121, 125, 136,
        153, 174, 191, 199, 195, 178, 158, 140, 130, 124, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 123, 123, 123, 123, 124, 125, 125, 125, 126, 127, 127, 127, 127,
        128, 129, 130, 130, 130, 130, 130, 131, 131, 131, 131, 130, 130, 129,
        128, 128, 128, 128, 127, 126, 125, 125, 125, 124, 124, 124, 124, 124,
        123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 123, 123, 123, 123, 123, 123, 123, 123, 123, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 125,
        125, 125, 125, 125, 125, 125, 125, 125, 125, 124, 123, 123, 123, 123,
        123, 122, 122, 122, 122, 122, 122, 123, 123, 123, 123, 122, 122, 122,
        122, 122, 128, 142, 162, 183, 199, 201, 193, 174, 154, 138, 129, 125,
        124, 124, 124, 124, 124, 124, 124, 124, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 124, 124, 124, 124, 124, 125, 126, 127, 127,
        127, 127, 128, 129, 129, 130, 130, 131, 131, 131, 131, 131, 131, 131,
        131, 130, 130, 130, 130, 129, 127, 127, 127, 127, 126, 125, 125, 125,
        125, 125, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        124, 125, 125, 126, 126, 126, 126, 126, 126, 126, 126, 126, 125, 125,
        124, 124, 123, 123, 123, 123, 123, 123, 123, 123, 124, 124, 124, 124,
        124, 124, 123, 122, 122, 128, 140, 158, 178, 194, 199, 192, 174, 155,
        139, 130, 125, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 125, 125,
        125, 125, 126, 127, 127, 127, 128, 128, 130, 130, 130, 130, 130, 131,
        131, 131, 131, 131, 131, 130, 129, 128, 127, 127, 127, 127, 126, 126,
        125, 125, 124, 124, 124, 124, 124, 124, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 124, 124, 125, 125, 125, 125, 125, 125,
        125, 125, 125, 124, 124, 124, 123, 122, 122, 122, 122, 122, 122, 122,
        123, 123, 123, 123, 122, 122, 122, 122, 122, 122, 127, 141, 160, 181,
        196, 200, 193, 174, 153, 138, 129, 125, 124, 124, 124, 124, 124, 124,
        124, 124, 124, 124, 123, 122, 122, 122, 122, 122, 122, 122, 123, 123,
        123, 123, 123, 124, 125, 125, 125, 125, 127, 127, 127, 127, 128, 128,
        130, 130, 130, 130, 130, 130, 130, 130, 130, 129, 129, 129, 128, 127,
        127, 127, 126, 125, 125, 125, 125, 125, 124, 124, 124, 124, 124, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        123, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 124, 122,
        122, 122, 122, 122, 121, 121, 121, 122, 123, 123, 123, 123, 123, 122,
        121, 121, 121, 121, 122, 128, 143, 164, 186, 200, 200, 190, 171, 151,
        136, 127, 124, 124, 124, 124, 123, 123, 123, 123, 123, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 123, 123, 123,
        124, 125, 125, 125, 125, 127, 127, 128, 128, 128, 128, 129, 129, 129,
        129, 129, 129, 129, 129, 129, 128, 127, 127, 125, 125, 125, 125, 125,
        124, 124, 124, 124, 124, 124, 123, 123, 123, 123, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 123,
        123, 123, 124, 124, 124, 124, 125, 125, 125, 124, 123, 122, 122, 122,
        122, 122, 121, 121, 121, 121, 121, 122, 123, 123, 122, 121, 121, 121,
        121, 121, 121, 124, 136, 155, 177, 194, 200, 196, 179, 158, 141, 129,
        124, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 121,
        121, 121, 121, 121, 121, 121, 122, 122, 122, 122, 123, 123, 124, 124,
        124, 125, 126, 127, 127, 127, 127, 128, 128, 128, 128, 128, 129, 129,
        129, 129, 129, 129, 129, 128, 127, 126, 126, 125, 125, 124, 124, 124,
        124, 124, 123, 123, 123, 123, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 124, 124, 124, 124,
        125, 125, 125, 125, 125, 125, 124, 123, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 123, 123, 123, 122, 121, 121, 121, 121, 121, 124,
        136, 156, 179, 197, 203, 199, 181, 160, 141, 130, 125, 124, 124, 124,
        123, 123, 123, 123, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 123, 123, 123, 123, 123, 124, 125, 125, 125, 125, 127,
        127, 127, 127, 128, 129, 130, 130, 130, 130, 130, 130, 130, 129, 129,
        128, 128, 127, 127, 127, 127, 127, 127, 125, 124, 123, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 123, 125,
        125, 125, 125, 125, 125, 125, 125, 124, 123, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 123, 123, 122, 122, 122, 122, 122,
        122, 122, 131, 146, 166, 186, 197, 197, 186, 166, 147, 133, 127, 125,
        124, 123, 123, 123, 123, 123, 123, 123, 123, 123, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 125, 125, 125, 125,
        126, 126, 127, 127, 128, 128, 128, 128, 128, 129, 129, 129, 129, 129,
        129, 129, 129, 128, 127, 125, 125, 125, 124, 124, 124, 124, 124, 124,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 121, 121, 121, 121, 121, 121, 121,
        121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121,
        121, 122, 122, 122, 123, 123, 123, 123, 123, 123, 124, 125, 125, 124,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 123,
        122, 121, 121, 121, 121, 121, 121, 125, 138, 158, 179, 196, 201, 195,
        176, 155, 139, 129, 125, 123, 122, 122, 122, 122, 122, 122, 121, 121,
        121, 121, 121, 120, 120, 120, 121, 121, 121, 122, 122, 123, 123, 123,
        123, 123, 124, 124, 125, 125, 126, 126, 126, 126, 127, 128, 128, 128,
        128, 128, 129, 129, 129, 129, 129, 129, 129, 127, 126, 126, 125, 125,
        124, 124, 124, 124, 124, 124, 123, 123, 123, 123, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 121,
        121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121,
        121, 121, 121, 121, 121, 121, 122, 123, 124, 124, 124, 124, 124, 124,
        124, 124, 124, 124, 124, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 121, 121, 121, 121, 121, 121, 125, 137, 157,
        180, 197, 201, 195, 177, 157, 139, 129, 124, 123, 123, 123, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 123, 123, 123, 123, 125, 125, 125, 125, 125, 125, 127, 127,
        128, 128, 128, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 128,
        127, 125, 125, 124, 124, 124, 124, 124, 124, 124, 124, 124, 123, 123,
        123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 125,
        125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 124, 123, 123, 122,
        122, 122, 122, 122, 122, 122, 123, 123, 123, 123, 123, 122, 122, 122,
        122, 122, 125, 136, 154, 176, 194, 202, 198, 181, 161, 142, 131, 125,
        124, 124, 124, 124, 124, 124, 124, 124, 124, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 125, 125, 125, 125, 125, 127,
        127, 127, 127, 128, 129, 129, 130, 130, 130, 130, 130, 130, 130, 130,
        130, 130, 129, 129, 129, 129, 127, 127, 126, 126, 126, 126, 125, 125,
        125, 125, 125, 125, 125, 125, 125, 124, 124, 124, 124, 124, 124, 124,
        124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
        124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
        124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
        124, 124, 125, 125, 125, 125, 125, 125, 126, 127, 127, 127, 125, 124,
        124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 125, 125, 124,
        123, 123, 123, 123, 123, 123, 127, 137, 154, 173, 190, 197, 193, 178,
        158, 142, 132, 127, 125, 124, 124, 124, 124, 124, 124, 124, 124, 124,
        124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 125, 125,
        126, 126, 126, 127, 127, 128, 128, 128, 128, 130, 130, 130, 130, 131,
        131, 131, 131, 131, 131, 131, 130, 130, 129, 129, 128, 127, 126, 125,
        125, 125, 125, 125, 125, 125, 125, 125, 124, 124, 124, 124, 124, 124,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 123, 124, 124, 124, 125, 125, 125, 125, 125,
        125, 125, 125, 124, 124, 124, 124, 124, 123, 122, 122, 122, 122, 122,
        122, 123, 123, 123, 123, 122, 122, 122, 122, 122, 124, 134, 151, 172,
        190, 199, 196, 181, 161, 143, 131, 125, 125, 125, 124, 124, 124, 124,
        124, 124, 124, 124, 124, 123, 122, 122, 122, 122, 122, 122, 122, 122,
        123, 124, 124, 124, 124, 125, 125, 125, 125, 127, 128, 128, 128, 128,
        128, 129, 130, 130, 130, 130, 130, 130, 130, 130, 129, 129, 129, 128,
        127, 127, 126, 126, 125, 125, 125, 125, 124, 124, 123, 123, 123, 123,
        123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 125,
        125, 125, 125, 125, 125, 125, 125, 126, 126, 125, 123, 123, 123, 123,
        123, 122, 122, 122, 122, 122, 122, 123, 123, 123, 123, 122, 122, 122,
        122, 121, 122, 132, 149, 171, 190, 200, 200, 186, 165, 146, 133, 126,
        124, 124, 124, 123, 123, 123, 123, 123, 123, 123, 123, 123, 122, 122,
        122, 122, 122, 122, 122, 122, 123, 123, 123, 123, 123, 124, 125, 125,
        125, 126, 127, 127, 127, 127, 128, 129, 130, 130, 130, 130, 130, 130,
        130, 130, 130, 129, 127, 126, 126, 126, 126, 126, 125, 124, 124, 124,
        124, 124, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 123, 124, 124, 124, 124, 124, 125, 125, 125, 125, 125,
        125, 123, 122, 122, 122, 122, 121, 121, 121, 121, 121, 121, 122, 122,
        122, 122, 122, 121, 121, 121, 121, 121, 125, 137, 157, 179, 196, 201,
        195, 178, 157, 139, 128, 124, 124, 124, 123, 123, 123, 123, 123, 123,
        123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 123,
        123, 123, 123, 125, 126, 126, 126, 127, 127, 127, 128, 128, 129, 130,
        130, 130, 130, 130, 130, 130, 130, 129, 129, 129, 129, 127, 126, 126,
        126, 126, 125, 125, 124, 124, 124, 124, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122,
        122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 125, 125, 125, 125,
        125, 126, 126, 126, 126, 126, 125, 124, 124, 124, 124, 123, 122, 122,
        122, 122, 122, 122, 122, 123, 123, 123, 122, 122, 122, 122, 122, 122,
        125, 136, 154, 174, 191, 198, 193, 177, 157, 139, 129, 125, 124, 124,
        123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123,
        123, 123, 123, 123, 123, 124, 124, 124, 125, 125, 125, 125, 126, 127,
        128, 129, 129, 129, 129, 130, 130, 130,
      ].slice(0, 1250),
      spo2_wave: [
        35, 32, 29, 28, 28, 30, 37, 46, 59, 72, 84, 92, 95, 94, 90, 84, 77, 69,
        62, 57, 53, 52, 51, 52, 52, 52, 51, 49, 47, 44, 40, 37, 34, 31, 29, 27,
        27, 30, 37, 47, 59, 72, 84, 92, 95, 94, 90, 83, 75, 67, 60, 55, 52, 50,
        50, 50, 50, 50, 49, 47, 44, 41, 37, 34, 30, 27, 25, 23, 24, 27, 34, 45,
        57, 70, 82, 89, 93, 92, 88, 81, 72, 64, 57, 51, 48, 46, 45, 45, 45, 45,
        43, 41, 38, 35, 31, 28, 25, 22, 19, 17, 17, 20, 26, 37, 50, 64, 78, 87,
        93, 94, 90, 83, 75, 66, 58, 51, 47, 44, 44, 44, 44, 44, 43, 41, 38, 34,
        31, 27, 23, 20, 17, 15, 13, 12, 13, 18, 27, 39, 54, 69, 82, 91, 95, 93,
        88, 81, 71, 62, 54, 48, 45, 43, 42, 43, 43, 43, 41, 39, 36, 32, 28, 24,
        20, 17, 14, 12, 10, 10, 13, 21, 32, 47, 62, 77, 88, 94, 94, 90, 83, 74,
        64, 55, 49, 45, 43, 43, 43, 44, 44, 44, 42, 39, 35, 31, 27, 23, 20, 17,
        15, 13, 14, 19, 28, 42, 58, 75, 89, 95, 95, 94, 90, 83, 75, 66, 59, 54,
        50, 48, 48, 49, 49, 49, 48, 46, 43, 40, 36, 32, 29, 26, 23, 21, 21, 25,
        32, 44, 58, 73, 86, 95, 95, 94, 90, 84, 76, 68, 61, 55, 51, 49, 49, 49,
        49, 49, 48, 46, 43, 40, 37, 33, 30, 26, 23, 21, 21, 24, 31, 41, 55, 69,
        82, 91, 95, 94, 90, 84, 76, 67, 59, 53, 49, 47, 47, 47, 47, 47, 46, 45,
        42, 39, 35, 31, 28, 24, 21, 19, 19, 22, 29, 40, 53, 68, 80, 89, 94, 93,
        89, 81, 72, 63, 54, 48, 44, 42, 42, 43, 44, 44, 43, 41, 38, 35, 31, 27,
        23, 20, 17, 15, 16, 21, 30, 43, 58, 74, 87, 95, 95, 93, 87, 78, 69, 59,
        52, 46, 43, 42, 43, 44, 45, 45, 44, 42, 39, 35, 31, 27, 23, 20, 18, 19,
        23, 32, 45, 60, 76, 90, 95, 95, 93, 88, 81, 73, 64, 57, 51, 48, 47, 47,
        48, 48, 48, 48, 46, 43, 40, 36, 33, 29, 26, 24, 24, 28, 36, 48, 62, 77,
        89, 95, 95, 93, 89, 82, 74, 65, 58, 53, 50, 48, 48, 49, 49, 49, 49, 47,
        44, 41, 38, 34, 31, 28, 26, 26, 28, 35, 45, 58, 72, 84, 93, 95, 94, 91,
        84, 76, 68, 60, 54, 50, 48, 48, 48, 49, 49, 48, 47, 45, 42, 39, 36, 33,
        30, 27, 27, 29, 34, 43, 56, 69, 82, 91, 95, 94, 91, 85, 77, 69, 62, 56,
        51, 49, 49, 49, 50, 50, 49, 48, 46, 43, 40, 37, 34, 31, 28, 26, 26, 28,
        33, 42, 54, 67, 80, 89, 95, 94, 91, 85, 77, 69, 61, 55,
      ].slice(0, 250),
      resp_wave: [
        125, 124, 122, 120, 119, 117, 115, 114, 112, 110, 108, 107, 105, 103,
        101, 99, 98, 96, 93, 91, 89, 86, 83, 80, 77, 74, 71, 68, 65, 62, 59, 56,
        53, 50, 48, 45, 43, 41, 39, 37, 35, 34, 32, 31, 30, 29, 29, 28, 28, 28,
        28, 27, 27, 27, 27, 27, 27, 28, 29, 29, 30, 31, 32, 33, 34, 35, 36, 38,
        40, 42, 45, 48, 51, 54, 58, 62, 66, 70, 74, 78, 82, 85, 89, 93, 97, 101,
        104, 108, 111, 115, 118, 121, 123, 125, 127, 129, 131, 133, 135, 137,
        139, 141, 143, 144, 146, 148, 149, 151, 152, 154, 155, 156, 158, 159,
        160, 161, 162, 163, 164, 165, 166, 167, 167, 168, 168, 168, 169, 169,
        170, 171, 171, 172, 172, 173, 173, 174, 175, 176, 176, 177, 178, 178,
        179, 180, 180, 181, 182, 182, 182, 182, 182, 182, 182, 182, 182, 181,
        181, 180, 179, 178, 177, 176, 175, 174, 173, 172, 171, 171, 170, 170,
        169, 168, 167, 166, 166, 165, 164, 163, 162, 161, 159, 158, 156, 155,
        153, 152, 150, 149, 148, 146, 145, 144, 143, 142, 141, 140, 139, 138,
        137, 136, 135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 124, 123,
        121, 120, 118, 117, 116, 114, 113, 112, 111, 110, 110, 109, 108, 107,
        107, 106, 105, 104, 103, 103, 102, 100, 99, 98, 97, 95, 94, 91, 89, 87,
        84, 81, 79, 76, 73, 71, 68, 66, 64, 63, 61, 60, 58, 57, 56, 56, 55, 55,
        54, 54, 54, 54, 54, 54, 54, 55, 56, 58, 60, 62, 63, 65, 67, 70, 72, 74,
        77, 79, 82, 85, 89, 92, 96, 99, 102, 105, 109, 112, 116, 119, 122, 125,
        127, 130, 133, 136, 138, 141, 143, 146, 148, 150, 152, 154, 155, 157,
        159, 160, 162, 163, 165, 167, 169, 170, 172, 174, 176, 178, 179, 181,
        182, 184, 186, 187, 189, 190, 192, 193, 194, 196, 197, 198, 199, 199,
        199, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
        200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 199, 199,
        198, 197, 197, 195, 194, 193, 192, 191, 189, 188, 187, 186, 184, 183,
        182, 180, 179, 178, 177, 176, 175, 174, 172, 171, 169, 168, 166, 164,
        162, 160, 158, 156, 153, 151, 148, 146, 144, 141, 139, 136, 134, 132,
        130, 128, 127, 125, 123, 121, 119, 117, 115, 114, 112, 110, 108, 107,
        105, 103, 102, 100, 98, 96, 94, 93, 91, 89, 88, 86, 85, 83, 82, 81, 80,
        79, 77, 76, 75, 74, 72, 71, 69, 68, 66, 64, 63, 61, 60, 58, 57, 56, 55,
        54, 53, 52, 50, 50, 49, 48, 47, 47, 46, 46, 46, 46, 46, 46, 47, 48, 49,
        51, 53, 55, 57, 59, 61, 63, 66, 69, 72, 74, 77, 80, 82, 85, 87, 90, 92,
        94, 96, 99, 101, 103, 105, 107, 110, 112,
      ].slice(0, 250),
    },
    param: {
      ecg_param: {
        signal: [
          getRandInt(0, 1),
          getRandInt(0, 1),
          getRandInt(0, 1),
          getRandInt(0, 1),
        ],
        lead: [
          getRandInt(0, 1),
          getRandInt(0, 1),
          getRandInt(0, 1),
          getRandInt(0, 1),
        ],
        gain: [
          getRandInt(0, 3),
          getRandInt(0, 3),
          getRandInt(0, 3),
          getRandInt(0, 3),
        ],
        filter: [
          getRandInt(0, 2),
          getRandInt(0, 2),
          getRandInt(0, 2),
          getRandInt(0, 2),
        ],
        resp: [
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
        ],
        hr: [
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
        ],
        st: [-1, -0.5, 0, 0.5],
      },
      nibp_param: {
        patient_mode: [0, 0, 0, 0],
        test_result: [
          getRandInt(0, 10),
          getRandInt(0, 10),
          getRandInt(0, 10),
          getRandInt(0, 10),
        ],
        status: [0, 0, 0, 0],
        cuff: [
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
        ],
        sys: [
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
        ],
        map: [
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
        ],
        dia: [
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
        ],
      },
      spo2_param: {
        status: [0, 0, 0, 0],
        spo2: [
          getRandInt(0, 100),
          getRandInt(0, 100),
          getRandInt(0, 100),
          getRandInt(0, 100),
        ],
        pr: [
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
          getRandInt(0, 250),
        ],
      },
      temp_param: {
        status: [0, 0, 0, 0],
        temp: [
          getRandInt(0, 45) + 0.5,
          getRandInt(0, 45) + 0.5,
          getRandInt(0, 45) + 0.5,
          getRandInt(0, 45) + 0.5,
        ],
      },
      ecg_peak: {
        time: [1, 2, 3, 4],
        peak: [
          getRandInt(0, 1),
          getRandInt(0, 1),
          getRandInt(0, 1),
          getRandInt(0, 1),
        ],
      },
      spo2_peak: {
        time: [1, 2, 3, 4],
        peak: [
          getRandInt(0, 1),
          getRandInt(0, 1),
          getRandInt(0, 1),
          getRandInt(0, 1),
        ],
      },
    },
    device: {
      bluetooth: {
        name: ["bluetooth", "bluetooth", "bluetooth", "bluetooth"],
        status: [0, 0, 0, 0],
      },
      battery: {
        charging: [0, 0, 0, 0],
        level: [100, 100, 100, 100],
      },
    },
    warning: {
      warning: ["warning_1", "waring_2"],
    },
  };
}
export const sampleFollowers_Data = {
  request_type: "FOLLOW_REQUEST",
  user_detail: {
    user_id: "8e322f04-e0f3-11ec-902a-107d1a455f8b",
    user_phone: "+849782059399",
    user_name: "Tda",
    is_disabled: false,
    fcm_token: null,
    created_at: 1653984520897,
    updated_at: 1666680361571,
    password: null,
    roles: ["user", "admin", "physician"],
    is_logged_in: true,
    last_logged_status_at: 1665412756182,
    wrong_password_count: 0,
    last_password_attempt_at: 0,
    image:
      "https://covi-life-djgdyxgtha-el.a.run.app/users/8e322f04-e0f3-11ec-902a-107d1a455f8b/image/59f1f89c-ff6d-11ec-9313-bbbb55502335",
    updated_by: null,
    created_by: null,
    source: null,
    logo: "trung_tam_nhi_khoa_bach_mai.png",
  },
  patient_detail: {
    user_id: "8e322f04-e0f3-11ec-902a-107d1a455f8b",
    patient_id: "18bfe2b3-e0f6-11ec-90ea-107d1a455f8b",
    patient_name: "dat",
    health_insurance_code: null,
    created_at: 1653985612344,
    updated_at: 1659173889966,
    is_disabled: false,
    dob: null,
    gender: null,
    code: null,
    address: null,
    temp_range: {
      alert: true,
      min: 35,
      max: 38,
    },
    hr_range: {
      alert: true,
      min: 60,
      max: 120,
    },
    nibp_range: {
      low_pressure: {
        alert: false,
        min: 10,
        max: 100,
      },
      high_pressure: {
        alert: false,
        min: 10,
        max: 100,
      },
    },
    spo2_range: {
      alert: true,
      min: 94,
      max: 100,
    },
    pr_range: {
      alert: true,
      min: 60,
      max: 120,
    },
    resp_range: {
      alert: true,
      min: 15,
      max: 30,
    },
    alarm_interval: 5,
    auto_save: 5,
    ethnic: "Tay3",
    religion: "",
    relation_with_me: "",
    occupation: "",
    nationality: "",
    phone: 0,
    is_default: false,
    image:
      "https://covi-life-djgdyxgtha-el.a.run.app/patients/18bfe2b3-e0f6-11ec-90ea-107d1a455f8b/image/7c23df86-269f-11ed-8322-58fb8404edee",
    device_mode: "Baby",
    device_mode_value: null,
    followers: [
      {
        id: "8f467c9e-2b95-11ed-89ac-751f0d9857ca",
        is_accepted: true,
        created_at: 1662215687223,
        updated_at: 1662215687223,
        user_id: "ce288346-e679-11ec-8449-e9ea4e23304e",
        shared_infos: [],
        request_type: "SHARE_REQUEST",
      },
    ],
    updated_by: null,
    partner: null,
    patient_partner_id: null,
    allergies: null,
    pregnancy_status: null,
    special_needs: null,
    patient_state: null,
    patient_age: null,
    patient_weight: null,
    patient_height: null,
    last_record_created_at: 1664098549517,
  },
  follower_detail: {
    user_id: "ce288346-e679-11ec-8449-e9ea4e23304e",
    user_phone: "+849782059400",
    user_name: "Dat",
    is_disabled: false,
    fcm_token: null,
    created_at: 1654617136583,
    updated_at: 1666381358153,
    password: null,
    roles: ["user", "admin"],
    is_logged_in: true,
    last_logged_status_at: 1666381358153,
    wrong_password_count: 0,
    last_password_attempt_at: 0,
    image:
      "https://covi-life-djgdyxgtha-el.a.run.app/users/ce288346-e679-11ec-8449-e9ea4e23304e/image/4f241c36-06bd-11ed-a227-97e98781a7e6",
    updated_by: null,
    created_by: null,
    source: null,
    logo: null,
  },
  follow_request: {
    id: "8f467c9e-2b95-11ed-89ac-751f0d9857ca",
    is_accepted: true,
    created_at: 1662215687223,
    updated_at: 1662215687223,
    user_id: "ce288346-e679-11ec-8449-e9ea4e23304e",
    shared_infos: [],
    request_type: "SHARE_REQUEST",
  },
};
