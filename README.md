
# i4Policy iConsult Tool
## (25/1/2019)
## v2.1 



## Introduction

The iConsult tool is a web application that allows a group of constituents to provide feedback and opinions on a sectioned draft document and to generate reports on collective and individual consultations. The tool has three major components, two of which are web applications one serving the end user and the other the administrator. The third component is a Facebook chat bot which serves as light extension of the end-user consultation tool. The platform allows the administrator to upload a sectioned draft document. These sections of the document will then be availed to end users via the end-user web application which allows the user to create an account, provide feedback, annotate on phrases or sentences after logging in. End users can also use the Facebook chat bot to register and/or login and provide feedback and comments on the uploaded draft policy document. All feedbacks and comments will be then be analyzed on the administrator web application on which reports with various parameters are provided. The frontend is built using Veu.JS, the backend uses node.js under the loopback API generator frame work for backend, and the records aer maintained using mongo db.

 ![](https://i.ibb.co/bN10SP2/1.png)
 
Source: Images are examples from a live deployment of the current version of the tool as of 26/1/2019 for i4Policy's community to co-create the Africa Innovation Policy Manifesto: https://manifesto.i4policy.org/



1. i4Policy Admin Panel

This sub component of the consultation tool allows the administrator to compose and submit a draft document broken down into sections which contain a set of paragraphs which can be rated and/or annotated. 

 ![](https://i.ibb.co/MgMrMBw/2.png)

The Admin Panel for iConsult allows the administrator to keep track of responses gathered from users individually for detailed user feedback analysis without revealing the identity of the consulting individual.  The component also provides an insight dashboard on live consultations using selected performance indicators.

 ![](https://i.ibb.co/2Mp3Nvj/3.png)

Using the Admin Panel, the moderator can also manage users that signed up for the consultation.

 ![](https://i.ibb.co/WBZ6cMN/4.png)



2. i4Policy consultation tool

This component of the tool is complete with a landing page and an authentication module that allows the user to sign-up directly or for frictionless access using other social media accounts. It has a dynamic localization module which allow any developer to translate the key words into a language of their choosing using a single translation spread sheet. Currently the tool is offered in English and French.

 ![](https://i.ibb.co/DrWr8Gm/5.png)

The tool allows a logged-in-user to provide a rating on the document sections as well as comments. The tool also allows a logged-in-user to provide a general feedback on their experience using the tool. Each section text can also be annotated on by selecting a section or the entire text. For a selected text a user can also provide a comment.



3. i4Policy Consultation Facebook Chat Bot

The chat bot serves as an extension of the consultation tool built to increase accessibility of the tool, allow users to register using their Facebook messenger id and start their consultation via a conversation with the bot. The bot collects ratings, reviews and comments from users.



## How to build
1. Clone this repository
2. `cd i4policy-web-client`
3. `make build`



## Acknowledgements

The iConsult tool was developed with funding from Open Society in West Africa (OSIWA). An earlier version of the tool was deployed for the Office of ICT, Innovation and Entrepreneurship (OIIE), of the National Information Technology Development Authority of the Nigerian Government (NITDA), to consult on a national policy vision (the Nigerian ICT Innovation and Entrepreneurship Vision, NIIEV) with support from the Make-IT in Africa project of the German Development Cooperation (GIZ). The World Bank has provided further support for the refinement of the tool in the context of policy support for innovation and entrepreneurship policy in the WAEMU sub-region.

AhadooTec, an Ethiopian software development firm, has led the technical development of these i4Policy tools. 
