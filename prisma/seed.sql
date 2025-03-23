--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: JobStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."JobStatus" AS ENUM (
    'APPLIED',
    'INTERVIEW',
    'OFFER',
    'REJECTED',
    'WITHDRAWN'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: JobApplication; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."JobApplication" (
    id text NOT NULL,
    "userId" text NOT NULL,
    company text NOT NULL,
    "position" text NOT NULL,
    location text NOT NULL,
    status public."JobStatus" DEFAULT 'APPLIED'::public."JobStatus" NOT NULL,
    "dateApplied" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastUpdated" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    notes text
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password text NOT NULL,
    "lastUpdated" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: JobApplication; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."JobApplication" (id, "userId", company, "position", location, status, "dateApplied", "lastUpdated", notes) FROM stdin;
cm8h28jci00069hnofykn7od7	cm8fk09jf0000apreed1jp2jf	Acme Inc	Frontend Developer	San Francisco, CA	INTERVIEW	2025-03-15 00:00:00	2025-03-20 07:59:43.07	
cm8h29q1900089hno3nmzkxll	cm8fk09jf0000apreed1jp2jf	Stark Industries	UI/UX Designer	New York, NY	OFFER	2025-02-03 00:00:00	2025-03-20 08:00:06.667	
cm8h2a3ws00099hno96ua572z	cm8fk09jf0000apreed1jp2jf	Wayne Enterprises	Product Manager	Chicago, IL	REJECTED	2025-02-17 00:00:00	2025-03-20 08:00:24.65	
cm8h2afda000a9hnonwdoiwx1	cm8fk09jf0000apreed1jp2jf	Umbrella Corporation	Backend Developer	Seattle, WA	APPLIED	2025-03-07 00:00:00	2025-03-20 08:00:39.502	
cm8h2au5r000b9hnovx17cy4s	cm8fk09jf0000apreed1jp2jf	Cyberdyne Systems	DevOps Engineer	Austin, TX	INTERVIEW	2025-02-10 00:00:00	2025-03-20 08:00:58.67	
cm8h2b5fh000c9hnoj8arteef	cm8fk09jf0000apreed1jp2jf	Initech	Software Engineer	Remote	WITHDRAWN	2025-02-12 00:00:00	2025-03-20 08:01:13.276	
cm8h291wy00079hnozauh3r3u	cm8fk09jf0000apreed1jp2jf	Globex Corporation	Full Stack Engineer	Remote	INTERVIEW	2025-03-20 07:59:11.374	2025-03-23 05:35:03.695	
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, name, email, "createdAt", password, "lastUpdated") FROM stdin;
cm8foxwcq0000gwb8tbbthrsv	felicia	felicia@gmail.com	2025-03-19 08:59:13.803	$2b$10$SCaSwJ5/HlVdxmHpFYZOLugiolqKvcDwM4r0iD40d5c742NNjrMiq	2025-03-19 08:59:13.803
cm8fk09jf0000apreed1jp2jf	demo	demo@example.com	2025-03-19 06:41:06.124	$2b$10$b5aE5.hNQMTbBBUkhJq5tO6jyITsjam73UKc/8LmkVBUF6rPc8Nxq	2025-03-20 07:45:52.691
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
dedbcd96-0c89-475c-9423-d768bbaa94b2	1b4e1086d5af2ba6cc60a568fa75cad6a07126679550c6e9dc39ea50f98dc47f	2025-03-18 05:53:02.880468+00	20250318055302_init	\N	\N	2025-03-18 05:53:02.871011+00	1
96e65a95-da79-4d19-a762-ea9f7fd6fb3f	8fe2cb667fb5365e2630133b5cf2c66617236917558b39495b88f1b732b800c5	2025-03-18 06:22:24.860282+00	20250318062224_init	\N	\N	2025-03-18 06:22:24.854047+00	1
af90b833-f7fe-492c-9b85-05d412f7b7bd	6dc27062b9f3af27cc0ba0f26383880c72456c060b864380ac37b776761df554	2025-03-19 08:55:17.91487+00	20250319085517_add_notes_to_job_application	\N	\N	2025-03-19 08:55:17.907675+00	1
55964782-7dfe-4ece-9265-1afc40db258c	84e48b8a6e0f98214c1666a065042ef5ee157a6cdfcdbd386ad4894500683a15	2025-03-20 05:30:49.129618+00	20250320053049_add_document_model	\N	\N	2025-03-20 05:30:49.122227+00	1
53318be6-b40d-44fc-90a8-effcd89c5829	97d06076413c97516de5dcb8b2cc2f103f4598242c13d3183d7a50a699e34c29	2025-03-20 06:27:30.660836+00	20250320062730_add_documents	\N	\N	2025-03-20 06:27:30.658483+00	1
\.


--
-- Name: JobApplication JobApplication_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."JobApplication"
    ADD CONSTRAINT "JobApplication_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: JobApplication JobApplication_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."JobApplication"
    ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;


--
-- PostgreSQL database dump complete
--

