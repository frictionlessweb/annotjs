from analyzer.aisingleton import openai


def analyze_user_request(request: str) -> str:
    res = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": """
You are a powerful document assistant who answers questions about a document and provides sources from the document that support the answer. You can ONLY output valid JSON.

Your output should be a typescript object of the type `AnswerWithQuestions`:

```
type Answer = {
  sources: string[];
  answer: string;
}

type AnswerWithQuestions = {
  answer: Answer;
  questions: string[];
}
```

The `answer` field contains a natural language answer, and the `sources` field contains a list of snippets copied from the document that supports the answer. The text in the `sources` field MUST come from the document. The snippets should be short, no more than 1 sentence each. The list of `sources` should be ranked by order of importance. The `questions` field contains suggested follow-up questions the user may want to ask. You must output only the `AnswerWithQuestions` object, with no other text.
""".strip(),
            },
            {
                "role": "user",
                "content": f"""The document that you are reading is below:
Title: Consumer & Community Banking 
Content: Consumer &  Community Banking 
We’re proud of the performance of  Consumer & Community Banking (CCB)  in 2022. In a rapidly changing macro  environment, we delivered strong financial results, drove meaningful growth of our franchise and continued our disciplined approach to investing for the future. We continued to put the customer at the center of everything we do, across every interac-tion and line of business. Through the efforts of more than 135,000 talented CCB employees, we extended our leadership positions in retail deposits and credit card while gaining momentum in our growth businesses: Wealth Management and  Connected Commerce. Overall, CCB has grown to serve nearly 80 million consum-ers and 5.7 million small businesses. 
CCB is operating from a position of strength with our distribution and scale, exceptional products and highly respected brand. We take none of this for granted. We recognize that 2023 remains uncertain; however, our data-driven approach to decision making, including risk management and investing, positions us well for what lies ahead. We provide value to customers through the completeness and interconnectivity of our products, services, channels and experiences. We strive to make it easy to do business with us by engaging custom-ers in the channel of their choice. Our strategy has not changed, and we are focused on a consistent set of strategic priorities: 
1. 
Delivering financial performance that is consistently best-in-class 
2. 
Leveraging data and technology to drive speed to market and deliver customer value 
3. 
Growing and deepening relationships by engaging customers with products and services they love and expanding our distribution 
4. 
Protecting our customers and the firm through a strong risk and controls environment 
5. 
Cultivating talent to build high- performing, diverse teams where culture is a competitive advantage 
DELIVERING FINANCIAL PERFORMANCE THAT IS CONSISTENTLY BEST-IN-CLASS 
In 2022, CCB delivered a 29% return on equity (ROE) on net income of $14.9 billion.G Revenue of $55 billion was up 10% year-over-year, and our overhead ratio was 57%, down one percentage point. 
We take a long-term approach to invest-ments and focus on delivering sustainable growth and outperformance. Last year, we continued to invest in data and tech-nology, in distribution through our branch network and marketing, and in our growth businesses.  
Our financial performance should also be considered in the context of the rapidly evolving macro environment, which  created both headwinds and tailwinds for our lines of business. On the strength of our models to acquire, engage and retain customer relationships, we continued to drive core growth in most of our busi-nesses. However, we acknowledge that our businesses are not immune to the macro landscape – Home Lending, in par-ticular, faced shrinking total market size. 
Average deposits of $1.2 trillion were up 10% over 2021, and we extended our  #1 market share in U.S. retail deposits3.  In 2022, the historic speed and magnitude of rate hikes accelerated the return toward normalized deposit margins.  
Our customers remain on solid footing. While still elevated, cash buffers4 are down from their peak, as spending con-tinued to be strong throughout 2022.  We ended the year with $439 billion  in average loans, up 1%. Credit perfor-mance across our portfolios remains strong, and, although net charge-offs were at historic lows, we continued to see normalization. In 2022, we built  $1.1 billion in credit reserves.  
The diversification of the CCB franchise, which provides natural hedges and deliv-ers industry-leading returns through the cycle, delivered another year exceeding 25% ROE. 
LEVERAGING DATA AND TECHNOLOGY TO DRIVE SPEED TO MARKET AND DELIVER CUSTOMER VALUE 
Data and technology are key differentia-tors and competitive advantages for CCB, enabling us to deliver innovation at scale. In 2022, our investments focused on two core categories: technology moderniza-tion and product development. These investments allow us to better respond to the needs of our customers, partners, employees and regulators — and to deliver the best of what Chase has to offer, with greater speed than ever before. 
On technology modernization, we are on a journey to mature our agile model, focused on our applications, infrastruc-ture and data, and are already realizing benefits from this work. Our migration of all Chase.com customers to the public cloud is generating higher site availability and leading to a 50% reduction in run-time costs. We’re scaling the use of AI/ML across CCB, which delivered over $500 million in value in 2022 alone, with more value to unlock in years to come. 
On product development, we’re investing to drive engagement and deliver experi-ences customers love across channels, products and platforms. To do so, we operate in a fully agile product structure — with close to 100 products and services delivered by dedicated design, product, data and technology teams. We’ve enhanced the Chase Mobile® app and Chase.com, making it easier for custom-ers to manage their everyday financial lives and engage with a richer offering of products and features. We also improved our platforms and experiences so cus-tomers can perform more activities with ease — such as more seamlessly opening new accounts. 
Data and technology are critical enablers, driving business value over time. The full scope of benefits will manifest in a num-ber of key areas — from reliability and speed to market to employee satisfaction. 
GROWING AND DEEPENING RELATIONSHIPS BY ENGAGING CUSTOMERS WITH PRODUCTS  AND SERVICES THEY LOVE AND EXPANDING OUR DISTRIBUTION 
In 2022, we grew our customer base by nearly 4% across all our lines of business. Here, our primary measure is customer5 growth because it indicates success as we strive to be the bank for all and to deepen and engage customer relationships. 
Banking and Wealth Management 
Our goal is to grow primary bank relation-ships with our customers across Banking and Wealth Management. Core to that goal is having the right products, experi-ences and distribution to meet our  customers in their channel of choice  and serve more of their financial needs. 
Our strategy is working. We are #1 in U.S. retail deposit share, driven by growth of more than $400 billion in deposits over the past three years. Key to this growth is the branch — and our branch network is second to none. We have the right branches in the right locations to capture a larger customer base in both legacy and new markets. 
Our branches are a local storefront, where digital engagement comes together with our bankers and advisors to deliver the full capabilities of JPMorgan Chase. Last year, nearly 40 million customers walked into our almost 5,000 branches. In 2021, we became the first bank with branches in all lower 48 states and have delivered on our commitment of 400 new branches in 25 states and the District of Columbia. Not only are our seasoned branches delivering value to our customers, communities and shareholders, but the investment in new branches is a key driver to market share gains over time. Our model’s success gives us confidence to continue to invest in new branches in high-opportunity markets where we still have significant untapped opportunity. 
Beyond our investments in the branch network, we continue to scale and improve products that meet the distinct needs of customers across segments. Last year, we enhanced our cash flow management solutions. We launched early direct deposit for our Secure  BankingSM customers, which allows them to access their paychecks up to two days early, and we enhanced Chase Overdraft AssistSM to provide an extra day before charging an overdraft fee. 
It’s part of our job to make it easy for  customers to have more of their banking relationship with us. We’re continuing  
to invest in natural adjacencies to the  Consumer Banking franchise so we can deepen and grow Business Banking and Wealth Management efficiently. 
For our Business Banking customers, we offer products, services and expertise to make it easier than ever to start, run and grow their businesses. We made it simpler to open a checking account, introduced more convenient methods to pay and get paid, and created a streamlined digital lending experience for faster access to capital when customers need it. We take pride in helping entrepreneurs go from idea to IPO and beyond. 
For our Wealth Management clients, we’re growing our advisor base and developing products and capabilities to serve clients across the wealth contin-uum. In 2022, we added more than 300 advisors on our path to 6,000, launched new products such as Wealth Plan and Personal Advisors, and continued to make enhancements to Self-Directed Investing. Our goal is to achieve $1 trillion in assets over the next several years, and we’re on track to do so. Payments, lending, commerce. We continue to be the #1 credit card issuer in the United States for both spend and lend, crossing $1 trillion in sales  volume in 2022. It is our marketing engine that fuels distribution and scale. Marketing is to Card what bankers, branches and advisors are to banking: baseline distribution. Our strategy is working. In 2022, we drove a 20% year-over-year increase in new accounts within our risk appetite. This drove our share of outstandings to 17.3%, up nearly 75 basis points — healthy progress toward our goal of 20% lend share over the long term. 
A large part of our Card strategy is to get the right products into customers’ hands. Over the last three years, we refreshed our entire branded card portfolio to ensure our cards’ value propositions were best-in-class and set up to perform well. We also renewed valuable relationships with our co-brand partners that cover the vast majority of co-brand spend share to at least 2027. Beyond consumer cards, we’re making progress on the opportunity with business customers, launching Ink Business Premier in the second half of 2022. While it's early days, the new card has been well-received, attracting higher-revenue small businesses that spend multiples above the average. 
Payments remain a center of gravity  for financial relationships. We are a lead-ing payments franchise in the United States, enabling our customers to move more than $5.6 trillion in 2022 across payment methods. 
To extend that leadership position, we’re also investing in our Commerce business. The strategy here is straightforward: Lean into what our customers do on our cards all the time — spend on travel, dining and shopping — and invest in digital experi-ences for Chase to win in discovery, book-ing, paying and borrowing across these journeys. With our recent acquisitions of cxLoyalty, FROSCH, Figg and The Infatua-tion, we now own differentiated assets and experiences in travel, offers and din-ing. We’re leveraging our new assets and talent to build out our two-sided platform, connecting customers and merchants as only a company with our scale and digi-tally engaged customer base can.  
#1 primary bank for U.S. small businesses 
#1 in total combined U.S. credit and debit payments volume 
#1 
#1 digital banking platform in the United States6 
Our efforts produced meaningful results in 2022: 
• 
Chase Travel: Our travel business delivered ~$8 billion in volume booked in 2022 
• 
Chase Offers: We drove over $6 billion in spend to merchants who used our offers platform 
• 
My Chase Plan®: Two years post-launch, we’ve opened more than 7 million plans 
The Connected Commerce business is driving impact for Chase by improving satisfaction, stimulating engagement and creating capital-light, recurring revenue streams, all while making the core franchise more resilient long term. As we told you at Investor Day last year, we expect to drive more than $30 billion in volume through our Commerce platforms in the next few years. 
Omnichannel engagement 
Our true differentiator is the combination of delivering award-winning digital capa-bilities to our 63 million active digital users, our extensive physical network spanning all lower 48 states, and our more than 50,000 local bankers, advi-sors, business relationship managers and branch managers, who operate as a local team of experts to serve customer needs. 
We’re building and delivering experiences our customers love and achieved record-high customer satisfaction across channels7 in 2022. Although we’re proud of this, we are never satisfied and recognize there’s always more to do for our customers. We prioritize improving activities our custom-ers do most often in their everyday lives, such as opening an account, replacing a card and making a payment. We also help them with major life milestones, like plan-ning for their future through goals-based plans or searching for and buying a car  or a home. 
A key part of our engagement strategy is ensuring we reach historically under-served populations. We continue to make meaningful strides in our community strategy in support of our $30 billion racial equity commitment announced in October 2020. 
Since then, we have: 
• 
Opened 13 Community Center branches in minority neighborhoods and hired over 140 Community Managers 
• 
Conducted over 9,000 financial health sessions with more than 190,000 attendees 
• 
Hired ~160 Community Home Lending Advisors and expanded our homebuyer grant program to more than 10,000 minority neighborhoods nationwide 
• 
Provided complimentary one-on-one coaching to nearly 3,000 small busi-nesses through dedicated consultants in 21 U.S. cities and launched a national special purpose credit program to improve access to credit for small business owners in historically under-served areas 
Marianne Lake 
Co-CEO, Consumer & Community Banking 
Jennifer Piepszak 
Co-CEO, Consumer & Community Banking
                """,
            },
            {
                "role": "user",
                "content": f"{request}",
            },
        ],
    )
    return res["choices"][0]["message"]["content"]  # type: ignore
