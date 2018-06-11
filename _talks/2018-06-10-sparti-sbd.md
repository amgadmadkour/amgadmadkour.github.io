---
title: "SPARTI: Scalable RDF Data Management Using Query-Centric Semantic Partitioning"
collection: talks
type: "Conference proceedings talk"
permalink: /talks/2015-11-02-sparti-sbd.html
venue: "ACM SBD@SIGMOD"
date: 2018-06-10
location: "Houston, Texas"
---

[[Download Slides](/files/presentations/SPARTI-SBD2018.pdf)]
[[Source Code](https://github.com/amgadmadkour/sparti)]

Semantic data is an integral component for search engines that provide answers beyond simple keyword-based matches. Resource Description Framework (RDF) provides a standardized and flexible graph model for representing semantic data. The astronomical growth of RDF data raises the need for scalable RDF management strategies. Although cloud-based systems provide a rich platform for managing large-scale RDF data, the shared storage provided by these systems introduces several performance challenges, e.g., disk I/O and network shuffling overhead. Hence, the way the data is distributed and partitioned can significantly affect query performance especially when the adopted partitioning technique is biased towards specific RDF query types, e.g., star, snowflake, linear, and complex. This paper presents SPARTI, an RDF data management system that is agnostic to the query shape. In SPARTI, the partitioning of the data evolves based on the join patterns found in the query-workload. Initially, SPARTI vertically partitions the RDF data, and then incrementally updates the partitioning according to the workload, which improves the query performance of frequent join patterns. SPARTI introduces a novel partitioning schema, termed SemVP, that enables the system to read a reduced set of rows instead of an entire partitions. SPARTI proposes a budgeting mechanism with a cost model to determine the worthiness of partitioning. Using real and synthetic datasets, SPARTI is shown to execute queries around half the time over all query shapes compared to the state-of-the-art while maintaining around an order of magnitude lower space-overhead.
