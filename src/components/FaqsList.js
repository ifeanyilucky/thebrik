import React, { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { config } from '../config';
import Iconify from './Iconify';
// ----------------------------------------------------------------------

export const commonQuestions = [
  {
    question: 'Who is Thebrik?',
    answer: `Thebrik is a rental solution company helping 
    students get their preferred hostel with less cost, time,and stress-free at no upfront fee.
    `,
    panel: 0
  },
  {
    question: 'How does Thebrik work?',
    answer: ` 
    Once you find the hostel you like, simply create a booking, with a few details about yourself. 
    Booking will be processed immediately and you will receive a call from us for inspection. No payment is taken until the booking is accepted. 
    and also no upfront fee is taken until you've booked your preferred hostel. You will then receive a message/call with the 
    details of your new hostels. All our hostels listed are verified and had met some standard before being 
    inspected by clients to cut down delays and disappointments faced with other agents.
    `,
    panel: 1
  },
  {
    question: 'Does Thebrik own the hostels listed?',
    answer: `No, Thebrik does not own the Hostels listed on its platform but we are currently developing
     properties and working on owning ours as we progress.
    
      `,
    panel: 2
  },
  {
    question: `I've been asked to make a payment outside of Thebrik, what should I do?`,
    answer: `We strongly recommend that you do not make any payments outside Thebrik. The safest way to secure a hostel payment is to make payments through the secured payment gateway on the website.`,
    panel: 345
  },
  {
    question: 'What are the extra charges on Thebrik?',
    answer: `There are no hidden charges nor upfront fees. All payment breakdown is available for each listed hostel.`,
    panel: 3
  },
  {
    question: 'Can I make a special request for hostel?',
    answer: `Yes you can. You can let us know if you need a shared flat, room mate, 
    or any other rental preferences that suits your budget and we will be more than happy to serve you.`,
    panel: 3543
  },
  {
    question: 'How soon can I get a hostel after making a request?',
    answer: `Our representative will contact you within an hour to process your inspection. We understand how important time is when looking for hostel. We are time conscious, therefore we act promptly to your requests.`,
    panel: 4
  },
  {
    question: `Can't find my preferred payment option, what should I do?`,
    answer: `
    We're sorry to hear that you're having trouble paying for your hostel. 
    Thebrik offers over 3 different payment methods for the payment stage. You can securely make your payment using:
Card, Bank transfer, Direct deposit.

If you are not able to use any of these methods to make your payment, please contact our support team to help you out immediately. 
    
    `,
    panel: 244
  },
  // {
  //   question: 'How much will I be charged for inspection fee?',
  //   answer: `Thebrik will not charge you any upfront fee until you have booked any of our hostel.
  //   You will he charged a flat fee of N3,000. This is basically our service charge for the entire value-packed service you have enjoyed.`,
  //   panel: 6
  // },
  {
    question: 'How do I know if the hostel is available?',
    answer: `Every listing on our platform are available, Thebrik automatically removes hostels that's been rented out from the listing page.`,
    panel: 7
  },
  {
    question: 'Is Thebrik safe?',
    answer: `Thebrik is a safe platform where a lot of  people have found their new home completely online.
    At Thebrik, we put our heart into getting a habitable home easily and affordable while placing your comfort at our core focus. 
    We verify the properties for you and take honest photos accompanied by an accurate description of the property for you to make the best and safe decision. 
    Our platform guarantees you a great experience with secure payments.`,
    panel: 8
  },

  {
    question: 'Can I filter hostels?',
    answer: `We have several search filters that can be used to tailor your search as much as possible to your needs.
    You will find the filters at the top of each search page. When you customize the filters, the search results are automatically updated.
    If you need further assistance, please do not hesitate to contact our booking team
    via email at thebrik.co@gmail.com
    or by telephone at  ${config.tel.support1}, ${config.tel.support2}.
    .`,
    panel: 10
  },
  {
    question: 'Do I get an invoice for my payment?',
    answer: `You will get a payment receipt from Thebrik and  a rental receipt from the landlord of the hostel.
    `,
    panel: 11
  },
  {
    question: 'How can I contact Thebrik support team?',
    answer: `For all queries.

    Thebrik support:
    Tel:  ${config.tel.support1}, ${config.tel.support2}
    Email: thebrik.co@gmail.com
    .`,
    panel: 12
  },
  {
    question: `What should I do if the hostel doesn't meet my requirement upon inspection?`,
    answer: `
    Please inform our Property Manager about it and state your preferences that suits you perfectly and be sure 
    to get a new hostel from us within 24hrs.
    `,
    panel: 13
  }
];

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export const agentFaqs = [
  {
    question: 'How can I trust Thebrik with my clients?',
    answer: `
    We care about building long-term relationships with our agents that will benefit both sides. If you lose a customer, then we lose this relationship. That’s not what we want. That’s one of the reasons why we guarantee never to contact your clients directly. We only deal with you.
    `,
    panel: 3
  },
  {
    question: 'How will I receive my agency fee',
    answer: `
    We offer the highest commission rates on the market. The exact amount you earn, however, can vary from each month and is dependent on a variety of factors. To get a full breakdown of how our commission structure works, we advise getting in touch with our support team.`,
    panel: 0
  }
];
const AccordionStyle = styled((props) => (
  <Accordion elevation={0} square disableGutters sx={{ boxShadow: 'none' }} {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: '15px',
  paddingTop: '15px',
  '&:before': {
    display: 'none'
  },
  boxShadow: 'none'
}));

const AccordionSummaryStyle = styled((props) => (
  <AccordionSummary
    expandIcon={
      <Box
        sx={{
          bgcolor: '#e6e9fb',
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Iconify icon="material-symbols:arrow-forward-ios-rounded" fontSize="14px" />
      </Box>
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(3)
  }
}));

const AccordionDetailsStyle = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2)
}));

// ----------------------------------------------------------------------

export default function FaqsList() {
  const [expanded, setExpanded] = useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Container>
      {commonQuestions.map((item) => (
        <AccordionStyle
          key={item.panel}
          expanded={expanded === item.panel}
          onChange={handleChange(item.panel)}
          sx={{ boxShadow: 'none' }}
        >
          <AccordionSummaryStyle>
            <Typography variant="subtitle1">{item.question}</Typography>
          </AccordionSummaryStyle>
          <AccordionDetailsStyle>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {item.answer}
            </Typography>
          </AccordionDetailsStyle>
        </AccordionStyle>
      ))}
    </Container>
  );
}
export function AgentFaqList() {
  const [expanded, setExpanded] = useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Container>
      {agentFaqs.map((item) => (
        <AccordionStyle
          key={item.panel}
          expanded={expanded === item.panel}
          onChange={handleChange(item.panel)}
          sx={{ boxShadow: 'none' }}
        >
          <AccordionSummaryStyle>
            <Typography variant="subtitle1">{item.question}</Typography>
          </AccordionSummaryStyle>
          <AccordionDetailsStyle>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {item.answer}
            </Typography>
          </AccordionDetailsStyle>
        </AccordionStyle>
      ))}
    </Container>
  );
}
