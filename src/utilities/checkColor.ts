export function isColorDark(color: string) {
   let r = 0, g = 0, b = 0

   if (color.startsWith("#")) {
      const hex = color.replace("#", "")
      r = parseInt(hex.substring(0, 2), 16)
      g = parseInt(hex.substring(2, 4), 16)
      b = parseInt(hex.substring(4, 6), 16)
   } else if (color.startsWith("rgb")) {
      const values = color.match(/\d+/g)?.map(Number)
      if (!values) return false
         ;[r, g, b] = values
   }

   // Perceived luminance formula
   const luminance = (0.299 * r + 0.587 * g + 0.114 * b)

   return luminance < 128
}