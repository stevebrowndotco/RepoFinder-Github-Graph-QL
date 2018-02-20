import React, { Component } from 'react';
export const Repo = ({ repo }) => <tr><td>{repo.name}</td><td>{repo.createdAt}</td><td>{repo.url ? <a href={repo.url}>Link</a> : null}</td></tr>;
