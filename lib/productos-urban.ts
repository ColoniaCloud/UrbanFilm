// Productos Urban publicados en el sitio.
// Fuente: tabla `products` del CRM (marca Urban). Solo nombre, familia, tono (VLT), foto y
// descripción; nunca precios, costos ni stock.
//
// `vlt` queda sin definir cuando el dato del CRM es dudoso (ver comentarios), para no
// publicar un número que podría ser incorrecto.

export type FamiliaId = 'nanocarbono' | 'nanoceramica' | 'security' | 'premium' | 'ppf'

export type Familia = {
  id: FamiliaId
  nombre: string
  resumen: string
}

export type ProductoUrban = {
  slug: string
  nombre: string
  familia: FamiliaId
  uso: 'Automotriz' | 'Arquitectónico' | 'Protección de pintura'
  /** Transmisión de luz visible, en %. Menor número = más oscura. */
  vlt?: number
  /** Foto en /public/img/productos. Sin definir si el CRM no tiene una foto propia. */
  imagen?: string
  descripcion?: string
}

export const FAMILIAS: Familia[] = [
  {
    id: 'nanocarbono',
    nombre: 'Nanocarbono',
    resumen: 'Lámina con partículas de carbono: color estable y sin componentes metálicos.',
  },
  {
    id: 'nanoceramica',
    nombre: 'Nanocerámica',
    resumen: 'Lámina con partículas cerámicas: buen rechazo de calor con claridad óptica.',
  },
  {
    id: 'security',
    nombre: 'Security',
    resumen: 'Láminas de seguridad: refuerzan el vidrio y ayudan a contener los fragmentos ante un impacto.',
  },
  {
    id: 'premium',
    nombre: 'Premium',
    resumen: 'Líneas de alto rendimiento para trabajos que piden un acabado diferencial.',
  },
  {
    id: 'ppf',
    nombre: 'PPF',
    resumen: 'Film de protección de pintura para carrocería.',
  },
]

const foto = (slug: string) => `/img/productos/${slug}.jpg`

export const PRODUCTOS: ProductoUrban[] = [
  { slug: 'urban-carbono-05', nombre: 'Urban Carbono 05', familia: 'nanocarbono', uso: 'Automotriz', vlt: 5, imagen: foto('urban-carbono-05') },
  { slug: 'urban-carbono-15', nombre: 'Urban Carbono 15', familia: 'nanocarbono', uso: 'Automotriz', vlt: 15, imagen: foto('urban-carbono-15') },
  { slug: 'pro-black-carbono-05', nombre: 'PRO Black Carbono 05', familia: 'nanocarbono', uso: 'Automotriz', vlt: 5, imagen: foto('pro-black-carbono-05') },
  { slug: 'pro-black-carbono-15', nombre: 'PRO Black Carbono 15', familia: 'nanocarbono', uso: 'Automotriz', vlt: 15, imagen: foto('pro-black-carbono-15') },
  // En el CRM el nombre dice 85 pero el tono es 75: sin VLT hasta confirmar cuál es el correcto.
  { slug: 'pro-black-carbono-85', nombre: 'PRO Black Carbono 85', familia: 'nanocarbono', uso: 'Automotriz', imagen: foto('pro-black-carbono-85') },

  // En el CRM "Urban Carbono 50" está cargado como Nanocerámica; se respeta esa familia.
  { slug: 'urban-carbono-50', nombre: 'Urban Carbono 50', familia: 'nanoceramica', uso: 'Automotriz', vlt: 50, imagen: foto('urban-carbono-50') },
  { slug: 'sky-blue', nombre: 'Sky Blue', familia: 'nanoceramica', uso: 'Automotriz', vlt: 65, imagen: foto('sky-blue') },

  // En el CRM "Security Clear" tiene tono 05, que no corresponde a una lámina clara: sin VLT.
  { slug: 'security-clear', nombre: 'Security Clear', familia: 'security', uso: 'Automotriz', imagen: foto('security-clear') },
  {
    slug: 'security-nanoceramic-15',
    nombre: 'Security Nanoceramic 15',
    familia: 'security',
    uso: 'Automotriz',
    vlt: 15,
    descripcion:
      'Lámina de seguridad con tecnología nanocerámica para vehículos, con tono del 15%: privacidad sin perder visibilidad. Rechaza el calor infrarrojo y bloquea el 99% de los rayos UV.',
  },
  {
    slug: 'security-architecture',
    nombre: 'Security Architecture',
    familia: 'security',
    uso: 'Arquitectónico',
    vlt: 70,
    imagen: foto('security-architecture'),
    descripcion:
      'Lámina de seguridad nanocerámica para arquitectura, con 70% de transmisión de luz visible: máxima claridad con control solar y refuerzo del vidrio.',
  },

  { slug: 'urban-ir-05', nombre: 'Urban IR 05', familia: 'premium', uso: 'Automotriz', vlt: 5, imagen: foto('urban-ir-05') },
  { slug: 'silver-espejado-15', nombre: 'Silver Espejado 15', familia: 'premium', uso: 'Automotriz', vlt: 15 },

  { slug: 'ppf-urban', nombre: 'PPF Urban', familia: 'ppf', uso: 'Protección de pintura', imagen: foto('ppf-urban') },
]

export const FAMILIA_POR_ID = Object.fromEntries(FAMILIAS.map((f) => [f.id, f])) as Record<FamiliaId, Familia>

export const PRODUCTO_POR_SLUG = Object.fromEntries(PRODUCTOS.map((p) => [p.slug, p])) as Record<string, ProductoUrban>

/** Opacidad de la capa de lámina para simular un VLT: 100% = vidrio claro, 5% = casi negro. */
export const opacidadDeLamina = (vlt: number) => ((100 - vlt) / 100) * 0.96
