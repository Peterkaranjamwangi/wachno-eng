import QuotationForm from '@/components/QuotationForm'
import Breadcrumb from '@/components/Common/Breadcrumb'

export const metadata = {
  title: 'Request a Quotation - Wachno Engineering',
  description: 'Request a quotation for our products and services',
}

export default function QuotationPage() {
  return (
    <>
      <Breadcrumb
        pageName="Request Quotation"
        description="Fill out the form below to request a quotation for our products and services"
      />
      <section className="pb-16 pt-16 md:pb-20 md:pt-20 lg:pb-28 lg:pt-28">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              Get a Quotation
            </h2>
            <p className="mx-auto max-w-3xl text-base !leading-relaxed text-body-color md:text-lg">
              Tell us about your project requirements and we'll provide you with a detailed quotation.
              Our team will review your request and get back to you within 24-48 hours.
            </p>
          </div>
          <QuotationForm />
        </div>
      </section>
    </>
  )
}
