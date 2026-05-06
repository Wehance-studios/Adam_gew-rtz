'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {CheckCircle2, ArrowLeft, AlertCircle, Banknote} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Separator} from '@/components/ui/separator'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {useCart} from '@/context/cart-context'
import {supabase} from '@/lib/supabase'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID
const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.string().min(5),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(3),
  country: z.string().min(1),
})
type FormValues = z.infer<typeof schema>
const SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 4.99

export default function CheckoutPage() {
  const {items, subtotal, clearCart} = useCart()
  const t = useTranslations('checkout')
  const locale = useLocale()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormValues>({resolver: zodResolver(schema)})

  async function onSubmit(data: FormValues) {
    setSubmitError(null)
    try {
      const {data: order, error: orderError} = await supabase
        .from('orders')
        .insert({
          restaurant_id: RESTAURANT_ID,
          customer_name: `${data.firstName} ${data.lastName}`,
          customer_email: data.email,
          customer_phone: data.phone,
          street_address: data.address,
          address: `${data.address}, ${data.city}, ${data.state} ${data.zip}, ${data.country}`,
          customer_city: data.city,
          customer_postal_code: data.zip,
          customer_country: data.country,
          total,
          payment_method: 'cash',
          status: 'pending',
          source: 'website',
          order_type: 'delivery',
        })
        .select('id, order_number')
        .single()
      if (orderError) throw new Error(orderError.message)
      const {error: itemsError} = await supabase.from('order_items').insert(
        items.map(item => ({
          order_id: order.id,
          menu_item_id: UUID_RE.test(item.id) ? item.id : null,
          menu_item_name: item.name,
          quantity: item.quantity,
          price_at_order_time: item.price,
          variant_id: item.variant_id ?? null,
          variant_name: item.variant_name ?? null,
          variant_unit: item.variant_unit ?? null,
          variant_unit_value: item.variant_unit_value ?? null,
        }))
      )
      if (itemsError) throw new Error(itemsError.message)
      clearCart()
      setOrderNumber(order.order_number?.toString() ?? order.id.slice(0, 8).toUpperCase())
      setOrderPlaced(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t('submitError'))
    }
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen"><Header />
        <div className="container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6">
          <p className="text-xl text-muted-foreground">{t('emptyCart')}</p>
          <Link href={`/${locale}/products`}><Button className="rounded-xl px-8">{t('browseProducts')}</Button></Link>
        </div>
        <Footer />
      </main>
    )
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen"><Header />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center max-w-lg mx-auto">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
          <h1 className="text-3xl font-bold text-foreground">{t('confirmed')}</h1>
          <p className="text-muted-foreground">{t('confirmedDesc')}</p>
          <div className="bg-muted rounded-2xl px-8 py-5 w-full">
            <p className="text-sm text-muted-foreground">{t('orderNumber')}</p>
            <p className="text-2xl font-mono font-bold text-foreground mt-1">#{orderNumber}</p>
          </div>
          <p className="text-sm text-muted-foreground">{t('emailSent')}</p>
          <Link href={`/${locale}`}><Button className="mt-2 px-8 py-6 text-base font-semibold rounded-xl">{t('backToHome')}</Button></Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen"><Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="mb-8 flex items-center gap-3">
          <Link href={`/${locale}/cart`}><Button variant="ghost" size="icon" className="rounded-xl"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <section className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold text-foreground mb-6">{t('shippingInfo')}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {([
                    {id:'firstName', col:1}, {id:'lastName', col:1},
                    {id:'email', col:1, type:'email'}, {id:'phone', col:1},
                    {id:'address', col:2},
                    {id:'city', col:1}, {id:'state', col:1},
                    {id:'zip', col:1}, {id:'country', col:1},
                  ] as const).map(f => (
                    <div key={f.id} className={`flex flex-col gap-1.5 ${f.col === 2 ? 'sm:col-span-2' : ''}`}>
                      <Label htmlFor={f.id}>{t(f.id)}</Label>
                      <Input id={f.id} type={('type' in f ? f.type : 'text') as string} placeholder={t(`${f.id}Placeholder` as any)} {...register(f.id)} />
                      {errors[f.id] && <p className="text-xs text-destructive">{errors[f.id]?.message}</p>}
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">{t('paymentMethod')}</h2>
                <div className="flex items-center gap-4 rounded-xl border-2 border-primary bg-primary/5 px-5 py-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Banknote className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t('cashOnDelivery')}</p>
                    <p className="text-sm text-muted-foreground">{t('cashOnDeliveryDesc')}</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">{t('orderSummary')}</h2>
                <div className="flex flex-col gap-3 mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} {t('eachLabel')}</p>
                      </div>
                      <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('subtotal')}</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('shipping')}</span>
                    {shipping === 0 ? <span className="text-green-600 font-medium">{t('free')}</span> : <span className="font-medium">${shipping.toFixed(2)}</span>}
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between text-base font-bold text-foreground">
                    <span>{t('total')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                {submitError && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />{submitError}
                  </div>
                )}
                <Button type="submit" disabled={isSubmitting} className="w-full mt-4 py-6 text-base font-semibold rounded-xl">
                  {isSubmitting ? t('placing') : t('placeOrder', {total: `$${total.toFixed(2)}`})}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">{t('agreeTerms')}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  )
}
