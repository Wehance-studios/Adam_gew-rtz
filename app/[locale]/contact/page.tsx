'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {MapPin, Phone, Mail, Clock, CheckCircle2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
})
type FormValues = z.infer<typeof schema>

export default function ContactPage() {
  const t = useTranslations('contact')
  const [sent, setSent] = useState(false)
  const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<FormValues>({resolver: zodResolver(schema)})

  const contactInfo = [
    {icon: MapPin, label: t('address'), value: 'Königstraße 42, 70173 Stuttgart, Germany'},
    {icon: Phone, label: t('phone'), value: '+49 711 123 4567'},
    {icon: Mail, label: t('emailLabel'), value: 'hello@earthyspice.co'},
    {icon: Clock, label: t('hours'), value: 'Mon – Fri: 9 am – 6 pm CET'},
  ]

  async function onSubmit(_data: FormValues) {
    await new Promise(r => setTimeout(r, 600))
    setSent(true)
    reset()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="bg-card border-b border-border py-10 lg:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{t('title')}</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
              {contactInfo.map(({icon: Icon, label, value}) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden border border-border h-72 lg:h-full lg:min-h-[280px]">
              <iframe
                title="Our location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.4!2d9.1800!3d48.7784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799db349dd55555%3A0x4ab94b90a3b21ecc!2sK%C3%B6nigstra%C3%9Fe%2C%2070173%20Stuttgart!5e0!3m2!1sen!2sde!4v1700000000000"
                width="100%"
                height="100%"
                style={{border: 0, minHeight: '280px'}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">{t('sendMessage')}</h2>
              {sent ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle2 className="w-14 h-14 text-green-500" />
                  <h3 className="text-xl font-bold text-foreground">{t('sentTitle')}</h3>
                  <p className="text-muted-foreground max-w-xs">{t('sentDesc')}</p>
                  <Button variant="outline" className="mt-2 rounded-xl" onClick={() => setSent(false)}>{t('sendAnother')}</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">{t('name')}</Label>
                      <Input id="name" placeholder={t('namePlaceholder')} {...register('name')} />
                      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input id="email" type="email" placeholder={t('emailPlaceholder')} {...register('email')} />
                      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="subject">{t('subject')}</Label>
                    <Input id="subject" placeholder={t('subjectPlaceholder')} {...register('subject')} />
                    {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message">{t('message')}</Label>
                    <Textarea id="message" placeholder={t('messagePlaceholder')} rows={6} className="resize-none rounded-xl" {...register('message')} />
                    {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="py-6 text-base font-semibold rounded-xl">
                    {isSubmitting ? t('sending') : t('send')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
