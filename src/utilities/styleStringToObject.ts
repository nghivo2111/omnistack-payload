import type { CSSProperties } from 'react'

export function styleStringToObject(style: string): CSSProperties {
  return style
    .split(';')
    .map(rule => rule.trim())
    .filter(Boolean)
    .reduce((acc, rule) => {
      const [property, value] = rule.split(':').map(s => s.trim())
      if (!property || !value) return acc

      const camelCaseProperty = property.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase()
      )

      acc[camelCaseProperty as keyof CSSProperties] = value as any
      
      return acc
    }, {} as CSSProperties)
}
