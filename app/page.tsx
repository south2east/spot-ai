import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const { data: places, error } = await supabase
    .from('places')
    .select('*')
  
  console.log(places)
  console.log(error)

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Spot AI
      </h1>

      <pre>
        {JSON.stringify(places, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
      <div className="space-y-4">
        {places?.map((place) => (
          <div
            key={place.id}
            className="border rounded-xl p-4"
          >
            <h2 className="text-xl font-semibold">
              {place.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {place.summary}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
              {place.category?.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}