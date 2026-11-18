import Image from 'next/image'
import { opacidadDeLamina, type ProductoUrban } from '@/lib/productos-urban'

type Props = {
  producto: ProductoUrban
  sizes: string
  priority?: boolean
}

/** Foto del producto o, si el CRM no tiene una propia, la escena del demo con la lámina a su tono. */
export default function ProductoFoto({ producto, sizes, priority }: Props) {
  if (producto.imagen) {
    return (
      <Image
        src={producto.imagen}
        alt={`Muestra de ${producto.nombre}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    )
  }

  return (
    <>
      <Image src="/img/tint-scene.jpg" alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      <div
        className="absolute inset-0 bg-[#04070a]"
        style={{ opacity: opacidadDeLamina(producto.vlt ?? 70) }}
        aria-hidden="true"
      />
    </>
  )
}
