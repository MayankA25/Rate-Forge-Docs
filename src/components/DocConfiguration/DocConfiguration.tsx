import React from 'react'
import DocContent from '../ui/DocContent'
import CodeBlock from '../CodeBlock/CodeBlock'
import Table from '../ui/Table'

export default function DocConfiguration() {

    const options = {
        code : `const limiter = new FixedWindow({
  store,
  limit: 100,
  window: 60_000,
});`,

        table: {
            tableHeaders : [ "Options", "Description" ],
            tableBody: [["store", "Storage backend used to persist rate limiting state."],["limit", "Maximum number of requests allowed within the configured limit period."], ["window", "Time period used by the rate limiting algorithm."]]
        }
    }

  return (
    <div className='flex flex-col font-bold'>
        <DocContent title="Configuration Overview" titleClassName='text-5xl' includeHashTag={true}>
            <div className="flex flex-col justify-center px-8 gap-3">
                <p>Rate Forge provides a flexible configuration system that allows you to customize how rate limiting is applied to your application. You can select the rate limiting algorithm and storage backend, define request limits, configure the identification key used for each client, control response headers, and customize the response returned when a request exceeds the configured limit.</p>
                <p>Rate Forge is designed to keep these configuration options independent from the underlying rate limiting algorithms and storage implementations, allowing you to adapt the limiter to different application requirements without changing the core architecture.</p>
            </div>
        </DocContent>
        <DocContent title="Options" includeHashTag={true} titleClassName='text-5xl mt-5'>
            <div className="flex flex-col justify-center px-8 gap-3">
                <p>Rate Forge options define the core behavior of the rate limiter. These options determine which algorithm and store are used, how requests are identified, and how the rate limit is applied.</p>
                <p>The exact options available can vary depending on the selected algorithm or store.</p>

                <CodeBlock code={options.code} language='ts' tabs={[]} />

                <Table tableHeaders={options.table.tableHeaders} tableBody={options.table.tableBody} />

                <p>The algorithm-specific options are documented separately on each algorithm page. Configuration options should always be used according to the requirements of the selected algorithm.</p>
            </div>
        </DocContent>
    </div>
  )
}
