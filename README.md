
# iConsult: i4Policy's Document Consultation Tool
## (25/1/2019)
## v2.1 
<br>

## Introduction

iConsult is a web application that enables distributed groups to provide feedback and opinions on a sectioned draft document and to generate reports on collective and individual consultations. 

The tool has three major components, two of which are web applications one serving the end user and the other the administrator. The third component is a Facebook chat bot which serves as a light extension of the end-user consultation tool. The admin panel allows the administrator to upload a sectioned draft document and extract data. These sections of the document will then be availed to end users via the end-user web application which allows the user to create an account, provide feedback, and annotate the document after logging in. End users can also use the Facebook chat bot to register and/or login and provide feedback and comments on the uploaded draft policy document. All feedbacks and comments will be then be analyzed on the administrator web application on which reports with various parameters are provided. The frontend is built using Veu.JS, the backend uses node.js under the loopback API generator frame work for backend, and the records aer maintained using mongo db.

 ![](https://i.ibb.co/bN10SP2/1.png)
 
Source: Images are examples from a live deployment of the current version of the tool as of 26/1/2019 for i4Policy's community to co-create the Africa Innovation Policy Manifesto: https://manifesto.i4policy.org/
<br>
<br>
<br>

### 1. iConsult Tool

This component of the tool is complete with a landing page and an authentication module that allows the user to sign-up directly or for frictionless access using other social media accounts. It has a dynamic localization module which allow any developer to translate the key words into a language of their choosing using a single translation spread sheet. Currently the tool is offered in English and French.
 
 ![](https://i.ibb.co/DrWr8Gm/5.png)
<br>
<br>

Users can **Rate** sections
![image](https://user-images.githubusercontent.com/43605024/56871487-e1b7e800-6a1e-11e9-82d3-7a05da54c047.png)
<br>
<br>

Users can **Comment** on sections
![image](https://user-images.githubusercontent.com/43605024/56871524-7589b400-6a1f-11e9-9e7f-972cc7ba1720.png)
<br>
<br>
 
Users can **Annotate** text
![image](https://user-images.githubusercontent.com/43605024/56871460-9b628900-6a1e-11e9-9b08-16178669feef.png)
<br>
<br>

And, users can have a **Discussion** via their preferred social media platform
![image](https://user-images.githubusercontent.com/43605024/56871543-b7b2f580-6a1f-11e9-9eda-690f076bed30.png)
<br>
<br>

### 2. iConsult Admin Panel

This sub component of the consultation tool allows the administrator to compose and submit a draft document broken down into sections which contain a set of paragraphs which can be rated and/or annotated. 
 ![](https://i.ibb.co/MgMrMBw/2.png)
<br>
<br>

The Admin Panel for iConsult allows the administrator to keep track of responses gathered from users individually for detailed user feedback analysis without revealing the identity of the consulting individual. The component also provides an insight dashboard on live consultations using selected performance indicators.
 ![](https://i.ibb.co/2Mp3Nvj/3.png)
<br>
<br>

### 3. iConsult Chat Bot

The chat bot serves as an extension of the consultation tool built to increase accessibility, particularly in low-bandwidth contexts and where a critical number of internet users access the internet in limited, messenger-only contexts. The chatbot allows users to register with their messenger id (in v2.1 this includes only Facebook) and start their consultation via a conversation with the bot. The bot collects ratings, reviews and comments from users.
<br>

## How to build
```
1. Clone this repository
2. `cd iConsult`
3. `make build`
```

## Acknowledgements

The iConsult tool was developed with funding from Open Society in West Africa (OSIWA). An earlier version of the tool was deployed for the Office of ICT, Innovation and Entrepreneurship (OIIE), of the National Information Technology Development Authority of the Nigerian Government (NITDA), to consult on a national policy vision (the Nigerian ICT Innovation and Entrepreneurship Vision, NIIEV) with support from the Make-IT in Africa project of the German Development Cooperation (GIZ). The World Bank has provided further support for the refinement of the tool in the context of policy support for innovation and entrepreneurship policy in the WAEMU sub-region.

AhadooTec, an Ethiopian software development firm, has led the technical development of these i4Policy tools: https://www.ahadootec.com/ 
